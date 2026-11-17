# See measure.js for usage. Needs: pip install pillow numpy
import json,sys,re
from PIL import Image
import numpy as np
png,js=sys.argv[1]+'.png',sys.argv[1]+'.json'
im=np.asarray(Image.open(png).convert('RGB')).astype(float)/255
def lin(c): return np.where(c<=0.03928,c/12.92,((c+0.055)/1.055)**2.4)
L=0.2126*lin(im[...,0])+0.7152*lin(im[...,1])+0.0722*lin(im[...,2])
worst={}
for r in json.load(open(js)):
    m=re.findall(r'[\d.]+',r['color']); fg=[float(x) for x in m[:3]]; a=float(m[3]) if len(m)>3 else 1
    fl=0.2126*lin(np.array(fg[0]/255))+0.7152*lin(np.array(fg[1]/255))+0.0722*lin(np.array(fg[2]/255))
    padx,pady=min(6,r['w']*.05),r['h']*.22   # central band: ignore 1px glass borders / highlights
    x0,y0=max(0,int(r['x']+padx)),max(0,int(r['y']+pady)); x1,y1=min(im.shape[1],int(r['x']+r['w']-padx)),min(im.shape[0],int(r['y']+r['h']-pady))
    if x1<=x0 or y1<=y0: continue
    reg=L[y0:y1,x0:x1].ravel()
    bg_hi,bg_lo=np.percentile(reg,95),np.percentile(reg,5)   # worst-case for light text = brightest bg
    # use whichever bg extreme is worse for this fg
    c_hi=(max(fl,bg_hi)+.05)/(min(fl,bg_hi)+.05); c_lo=(max(fl,bg_lo)+.05)/(min(fl,bg_lo)+.05)
    c=min(c_hi,c_lo)
    large = r['fs']>=24 or (r['fs']>=18.66 and int(r['fw'])>=700)
    need=3.0 if large else 4.5
    key=(r['s'])
    if key not in worst or c<worst[key][0]: worst[key]=(c,need,r['fs'],r['text'])
bad=0
for k,(c,need,fs,t) in sorted(worst.items()):
    ok=c>=need; bad+= (not ok)
    print(f"  {'✓' if ok else '✗'} {c:5.2f}:1 (need {need})  {k:22s} {fs:5.1f}px  “{t}”")
print('FAIL' if bad else 'PASS', f'({bad} below threshold)')
