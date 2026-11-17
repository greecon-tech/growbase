#!/usr/bin/env node
// Local preview server for ./dist — mimics Netlify closely enough to test:
//   pretty URLs, language-specific 404s, the real _headers (incl. CSP), and form POSTs.
//   node scripts/serve.mjs [port]
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// parse the real _headers file (blocks: path pattern line, then indented "Name: value")
const blocks = [];
try {
  let cur;
  for (const line of (await readFile(path.join(ROOT, '_headers'), 'utf8')).split('\n')) {
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) blocks.push((cur = { pattern: line.trim(), headers: {} }));
    else {
      const i = line.indexOf(':');
      cur.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
} catch {}
const matches = (pattern, url) => {
  const re = new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
  return re.test(url);
};

const exists = async (p) => stat(p).then((s) => s, () => null);

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    let pathname = decodeURIComponent(url.pathname);
    const headers = {};
    for (const b of blocks) if (matches(b.pattern, pathname)) Object.assign(headers, b.headers);

    if (req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;
      console.log('[form POST]', pathname, body.slice(0, 300));
      res.writeHead(200, { 'Content-Type': 'text/plain', ...headers });
      return res.end('ok');
    }

    let file = path.join(ROOT, pathname);
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    let st = await exists(file);
    if (st?.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }); return res.end(); }
      file = path.join(file, 'index.html');
      st = await exists(file);
    }
    let status = 200;
    if (!st) {
      status = 404;
      file = path.join(ROOT, pathname.startsWith('/sq/') ? 'sq/404.html' : '404.html');
    }
    try {
      const data = await readFile(file);
      res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', ...headers });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end('error');
    }
  })
  .listen(PORT, () => console.log(`preview → http://localhost:${PORT}`));
