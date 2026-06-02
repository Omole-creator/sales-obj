"""Compose the 4 ebooks into one 400x300 PNG, modelled on bra.png:
near-black stage, a golden light-burst + sparkles behind the bigger centre book,
edge-lit glowing spines, page-thickness on each volume, and a glossy reflective
floor. Books stand upright in a row, main in the middle. Rendered at 3x.
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from collections import deque
import math, random

S = 3
W, H = 400 * S, 300 * S
ROOT = r"C:\Users\HP\Desktop\SALES"
random.seed(7)


# ---------- helpers ----------------------------------------------------------
def trim_white(im, thresh=238):
    g = np.asarray(im.convert("L"))
    ys, xs = np.where(g < thresh)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)) if len(xs) else im


def key_black(im, thresh=24):
    rgb = np.asarray(im.convert("RGB")).astype(np.int16)
    h, w, _ = rgb.shape
    dark = rgb.max(axis=2) < thresh
    seen = np.zeros((h, w), bool)
    dq = deque()
    for x in range(w):
        for y in (0, h - 1):
            if dark[y, x]:
                seen[y, x] = True; dq.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if dark[y, x] and not seen[y, x]:
                seen[y, x] = True; dq.append((y, x))
    while dq:
        y, x = dq.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and dark[ny, nx]:
                seen[ny, nx] = True; dq.append((ny, nx))
    a = np.asarray(im.convert("RGBA")).copy()
    a[:, :, 3] = np.where(seen, 0, 255).astype(np.uint8)
    return Image.fromarray(a, "RGBA")


def cover_3d(im):
    """Flat cover -> upright volume: dark spine (left), bright page block (right),
    dark base. The page block gives the bra-style thickness."""
    im = im.convert("RGBA")
    px = np.asarray(im).astype(float)
    h, w = px.shape[:2]
    sp = max(4, int(w * 0.07))
    px[:, :sp, :3] *= np.linspace(0.42, 1.0, sp)[None, :, None]
    px[-max(3, int(h * 0.012)):, :, :3] *= 0.35
    cover = Image.fromarray(np.clip(px, 0, 255).astype(np.uint8), "RGBA")
    # page block: a cream strip glued to the right edge = book thickness
    pw = max(3, int(w * 0.055))
    pg = np.zeros((h, pw, 4), float)
    ramp = np.linspace(0.75, 1.0, pw)
    pg[:, :, 0] = 238 * ramp; pg[:, :, 1] = 230 * ramp; pg[:, :, 2] = 208 * ramp
    pg[:, :, 3] = 255
    for yy in range(0, h, 3):                 # faint page lines
        pg[yy:yy + 1, :, :3] *= 0.82
    pg[:max(2, int(h * 0.01)), :, :3] *= 0.4
    pg[-max(3, int(h * 0.012)):, :, :3] *= 0.3
    out = Image.new("RGBA", (w + pw, h), (0, 0, 0, 0))
    out.alpha_composite(cover, (0, 0))
    out.alpha_composite(Image.fromarray(pg.astype(np.uint8), "RGBA"), (w, 0))
    return out


def fit_h(im, th):
    w, h = im.size
    return im.resize((max(1, round(w * th / h)), th), Image.LANCZOS)


def glow_halo(sprite, color, grow, blur, strength):
    """Coloured halo from a sprite silhouette (edge-light look)."""
    a = sprite.split()[3]
    if grow:
        a = a.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    a = a.filter(ImageFilter.GaussianBlur(blur)).point(lambda v: int(v * strength))
    g = Image.new("RGBA", sprite.size, color + (0,))
    g.putalpha(a)
    return g


def shadow_of(sprite, blur):
    a = sprite.split()[3].point(lambda v: int(v * 0.6))
    sh = Image.new("RGBA", sprite.size, (0, 0, 0, 0)); sh.putalpha(a)
    return sh.filter(ImageFilter.GaussianBlur(blur))


# ---------- load + slice -----------------------------------------------------
main = key_black(Image.open(f"{ROOT}/public/mainbook.png"))
am = np.asarray(main)[:, :, 3]; ys, xs = np.where(am > 8)
main = main.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

three = Image.open(f"{ROOT}/public/3book.jpg").convert("RGB")
cuts = [(22, 415), (432, 838), (858, 1272)]
bonus = [cover_3d(trim_white(three.crop((x0, 0, x1, three.height)))) for x0, x1 in cuts]


# ---------- near-black stage -------------------------------------------------
yy = np.linspace(0, 1, H)[:, None]; xx = np.linspace(0, 1, W)[None, :]
horizon = 0.70
top = np.array([8, 7, 11]); mid = np.array([15, 12, 18]); floor = np.array([3, 3, 5])
base = np.empty((H, W, 3))
for c in range(3):
    up = top[c] + (mid[c] - top[c]) * (yy / horizon)
    lo = mid[c] + (floor[c] - mid[c]) * ((yy - horizon) / (1 - horizon))
    base[:, :, c] = np.where(yy < horizon, up, lo)

# big golden glow behind the centre book
cx_c, cy_c = 0.5, 0.42
d = np.sqrt(((xx - cx_c) * 1.15) ** 2 + (yy - cy_c) ** 2)
base += (np.clip(1 - d / 0.5, 0, 1) ** 2)[:, :, None] * np.array([255, 196, 96]) * 0.85
base += (np.clip(1 - d / 0.95, 0, 1) ** 2)[:, :, None] * np.array([120, 70, 20]) * 0.5

# vignette
dv = np.sqrt((xx - 0.5) ** 2 + (yy - 0.45) ** 2)
base *= np.clip(1 - (dv - 0.28) * 1.25, 0.18, 1)[:, :, None]

bg = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

# radiating light burst behind the centre
burst = Image.new("RGBA", (W, H), (0, 0, 0, 0))
bd = ImageDraw.Draw(burst)
ccx, ccy = W * cx_c, H * cy_c
for k in range(40):
    ang = k / 40 * 2 * math.pi + 0.1
    ln = (0.4 + 0.6 * random.random()) * W * 0.5
    wsp = 0.022
    p1 = (ccx + math.cos(ang - wsp) * ln, ccy + math.sin(ang - wsp) * ln)
    p2 = (ccx + math.cos(ang + wsp) * ln, ccy + math.sin(ang + wsp) * ln)
    bd.polygon([(ccx, ccy), p1, p2], fill=(255, 205, 120, 30))
burst = burst.filter(ImageFilter.GaussianBlur(5 * S))
bg = Image.alpha_composite(bg, burst)

# bokeh sparkles drifting around the centre
spk = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(spk)
for _ in range(70):
    r = random.random() ** 0.5 * W * 0.32
    a = random.random() * 2 * math.pi
    px, py = ccx + math.cos(a) * r, ccy + math.sin(a) * r * 1.15 + H * 0.06
    rad = random.uniform(1, 4) * S
    al = random.randint(60, 180)
    sd.ellipse([px - rad, py - rad, px + rad, py + rad], fill=(255, 214, 140, al))
spk = spk.filter(ImageFilter.GaussianBlur(1.1 * S))
bg = Image.alpha_composite(bg, spk)


# ---------- place books ------------------------------------------------------
baseline = int(H * 0.71)
glows = Image.new("RGBA", (W, H), (0, 0, 0, 0))
books = Image.new("RGBA", (W, H), (0, 0, 0, 0))
refl  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
shad  = Image.new("RGBA", (W, H), (0, 0, 0, 0))

# (sprite, height_frac, centre_x_frac, glow_color)   back -> front
layout = [
    (bonus[0], 0.52, 0.120, (90, 170, 210)),    # Before  (blue)
    (bonus[1], 0.55, 0.300, (210, 165, 95)),     # Offer   (gold)
    (bonus[2], 0.54, 0.840, (205, 200, 100)),    # DeadLead(yellow-gold)
    (main,     0.70, 0.500, (255, 195, 95)),     # hero    (gold)
]

for sprite, hf, cxf, col in layout:
    s = fit_h(sprite, int(H * hf))
    w, h = s.size
    x = round(W * cxf - w / 2); y = baseline - h
    glows.alpha_composite(glow_halo(s, col, grow=2, blur=10 * S, strength=0.55), (x, y))
    glows.alpha_composite(glow_halo(s, col, grow=1, blur=3 * S, strength=0.8), (x, y))
    shad.alpha_composite(shadow_of(s, 6 * S), (x + 2 * S, y + 5 * S))
    m = s.transpose(Image.FLIP_TOP_BOTTOM)
    ma = np.asarray(m).astype(float)
    ma[:, :, 3] *= np.clip(np.linspace(0.5, 0.0, h), 0, 1)[:, None]
    refl.alpha_composite(Image.fromarray(np.clip(ma, 0, 255).astype(np.uint8), "RGBA"), (x, baseline))
    books.alpha_composite(s, (x, y))

refl = refl.filter(ImageFilter.GaussianBlur(1.3 * S))

out = bg
out = Image.alpha_composite(out, refl)
out = Image.alpha_composite(out, glows)
out = Image.alpha_composite(out, shad)
out = Image.alpha_composite(out, books)

out = out.convert("RGB").resize((400, 300), Image.LANCZOS)
out.save(f"{ROOT}/4books.png")
out.save(f"{ROOT}/public/4books.png")
print("saved 4books.png (400x300) modelled on bra.png")
