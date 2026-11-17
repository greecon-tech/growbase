#!/usr/bin/env python3
"""
Grow Base — asset pipeline (run once; outputs are committed).

  pip install pillow numpy potracer
  python3 tools/make-assets.py

Produces, under src/public/assets/img and src/public:
  * logo.svg / logo-path.txt   vectorised from the client's master PNG
  * art-*.webp / art-*.avif    responsive crops of the two public-domain paintings
  * favicon set                favicon.svg, favicon.ico, PNG icons, apple-touch-icon
"""
import json
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

try:
    import potrace
except ImportError:  # pragma: no cover
    sys.exit("pip install potracer")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "src" / "public"
IMG = OUT / "assets" / "img"
IMG.mkdir(parents=True, exist_ok=True)

CHARCOAL = (0x3A, 0x35, 0x30)
LOGO_COPPER = "#c17c3a"


# ───────────────────────── logo → SVG ─────────────────────────
def trace_logo():
    im = Image.open(SRC / "brand" / "logo-master.png").convert("RGBA")
    alpha = im.split()[3]
    bbox = alpha.getbbox()
    pad = 6
    bbox = (bbox[0] - pad, bbox[1] - pad, bbox[2] + pad, bbox[3] + pad)
    alpha = alpha.crop(bbox)
    # light blur + threshold removes pixel stair-steps before tracing
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.2)).point(lambda v: 255 if v > 127 else 0)
    w, h = alpha.size
    # potracer fills pixels that are *dark* (< blacklevel); logo pixels are opaque, so invert
    data = np.array(alpha) <= 0
    bm = potrace.Bitmap(data)
    plist = bm.trace(
        turdsize=20,
        turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
        alphamax=1.15,
        opticurve=True,
        opttolerance=0.6,
    )
    # normalise to a 1000-unit-wide viewBox
    k = 1000.0 / w
    parts = []

    def pt(p):
        return f"{p.x * k:.1f} {p.y * k:.1f}"

    for curve in plist:
        parts.append("M" + pt(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                parts.append("L" + pt(seg.c) + "L" + pt(seg.end_point))
            else:
                parts.append("C" + pt(seg.c1) + " " + pt(seg.c2) + " " + pt(seg.end_point))
        parts.append("Z")
    d = "".join(parts).replace(" -", "-")
    vb_w, vb_h = 1000, round(h * k, 1)
    (OUT / "assets" / "img" / "logo-path.json").write_text(
        json.dumps({"d": d, "w": vb_w, "h": vb_h, "bbox": bbox}), encoding="utf-8"
    )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}" role="img" aria-label="Grow Base">'
        f'<path fill="{LOGO_COPPER}" fill-rule="evenodd" d="{d}"/></svg>'
    )
    (IMG / "logo.svg").write_text(svg, encoding="utf-8")
    print(f"logo.svg  viewBox {vb_w}x{vb_h}  path {len(d)} bytes")
    return d, vb_w, vb_h, bbox


# ───────────────────────── favicons ─────────────────────────
def make_icons(d, vb_w, vb_h):
    master = Image.open(SRC / "brand" / "logo-master.png").convert("RGBA")
    bb = master.split()[3].getbbox()
    logo = master.crop(bb)

    def tile(size, logo_frac, radius_frac=0.0):
        s = size * 4  # supersample
        canvas = Image.new("RGBA", (s, s), CHARCOAL + (255,))
        lw = int(s * logo_frac)
        lh = int(lw * logo.height / logo.width)
        lg = logo.resize((lw, lh), Image.LANCZOS)
        canvas.alpha_composite(lg, ((s - lw) // 2, (s - lh) // 2))
        if radius_frac:
            mask = Image.new("L", (s, s), 0)
            ImageDraw.Draw(mask).rounded_rectangle((0, 0, s - 1, s - 1), int(s * radius_frac), fill=255)
            canvas.putalpha(mask)
        return canvas.resize((size, size), Image.LANCZOS)

    tile(32, 0.74, 0.2).save(OUT / "favicon-32.png")
    tile(180, 0.66).save(OUT / "apple-touch-icon.png")
    tile(192, 0.60).save(OUT / "icon-192.png")
    tile(512, 0.60).save(OUT / "icon-512.png")
    ico = [tile(s, 0.74, 0.2) for s in (16, 32, 48)]
    ico[2].save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=ico[:2])

    # SVG favicon: rounded charcoal tile + the traced path
    scale = 0.74 * 100 / vb_w
    tx, ty = 13, (100 - vb_h * scale) / 2
    fav = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<rect width="100" height="100" rx="20" fill="#3a3530"/>'
        f'<path transform="translate({tx} {ty:.2f}) scale({scale:.5f})" fill="{LOGO_COPPER}" fill-rule="evenodd" d="{d}"/></svg>'
    )
    (OUT / "favicon.svg").write_text(fav, encoding="utf-8")
    print("favicons written")


# ───────────────────────── artwork ─────────────────────────
def save_variants(im, name, widths, q_webp=78, q_avif=48):
    out = {}
    for w in widths:
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(IMG / f"{name}-{w}.webp", "WEBP", quality=q_webp, method=6)
        r.save(IMG / f"{name}-{w}.avif", "AVIF", quality=q_avif, speed=6)
        out[w] = (w, h)
    return out


def make_art():
    lor = Image.open(SRC / "art" / "lorrain-seaport-queen-of-sheba-1648-1920.jpg").convert("RGB")
    lem = Image.open(SRC / "art" / "lemoyne-apotheosis-of-hercules-1736-1920.jpg").convert("RGB")
    sizes = {}
    # Lorrain portrait (hero arch): sun, galleon and tower, without the left column
    arch = lor.crop((420, 0, 420 + 1095, 1460))
    sizes["lorrain-arch"] = save_variants(arch, "art-lorrain-arch", [480, 760, 1095])
    # Lorrain landscape (about page gallery plate)
    sizes["lorrain-wide"] = save_variants(lor, "art-lorrain-wide", [720, 1280, 1920])
    # Lemoyne: crop inside the stucco frame (same framing as the client's supplied crop)
    inner = lem.crop((135, 0, 1800, 1452))
    sizes["lemoyne-wide"] = save_variants(inner, "art-lemoyne-wide", [720, 1280, 1665])
    # Lemoyne arch (portrait crop on the luminous centre) for secondary arches
    cx = 1665 * 0.50
    arch2 = inner.crop((int(cx - 540), inner.height - 1440, int(cx + 540), inner.height))
    sizes["lemoyne-arch"] = save_variants(arch2, "art-lemoyne-arch", [480, 760, 1080])
    (IMG / "art-sizes.json").write_text(
        json.dumps({k: {str(w): list(v) for w, v in d.items()} for k, d in sizes.items()}), encoding="utf-8"
    )
    print("art variants:", {k: list(v) for k, v in sizes.items()})


if __name__ == "__main__":
    d, w, h, bb = trace_logo()
    make_icons(d, w, h)
    make_art()
