"""Put 1.png, 2.png, 3.png, 4.png in one frame on the brand-orange background,
with 3.png ("How to Turn I'm Not Interested Into Sales in Nigeria") in the middle
and bigger. Covers are given subtle book depth + drop shadows.
"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

ROOT = r"C:\Users\HP\Desktop\SALES"
BRAND = (255, 69, 0)          # #FF4500
W, H = 1280, 800


def trim_bg(im, thresh=244):
    """Trim a near-white border (1.png sits on white)."""
    g = np.asarray(im.convert("L"))
    ys, xs = np.where(g < thresh)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)) if len(xs) else im


def cover_3d(im):
    """Flat cover -> standing book: dark left spine, cream page block on the
    right, darkened bottom edge."""
    im = im.convert("RGBA")
    px = np.asarray(im).astype(float)
    h, w = px.shape[:2]
    sp = max(4, int(w * 0.05))
    px[:, :sp, :3] *= np.linspace(0.5, 1.0, sp)[None, :, None]
    px[-max(3, int(h * 0.012)):, :, :3] *= 0.5
    cover = Image.fromarray(np.clip(px, 0, 255).astype(np.uint8), "RGBA")
    pw = max(3, int(w * 0.04))
    pg = np.zeros((h, pw, 4), float)
    ramp = np.linspace(0.72, 1.0, pw)
    pg[:, :, 0] = 240 * ramp; pg[:, :, 1] = 232 * ramp; pg[:, :, 2] = 210 * ramp
    pg[:, :, 3] = 255
    for yy in range(0, h, 4):
        pg[yy:yy + 1, :, :3] *= 0.8
    pg[:max(2, int(h * .01)), :, :3] *= 0.45
    pg[-max(3, int(h * .012)):, :, :3] *= 0.4
    out = Image.new("RGBA", (w + pw, h), (0, 0, 0, 0))
    out.alpha_composite(cover, (0, 0))
    out.alpha_composite(Image.fromarray(pg.astype(np.uint8), "RGBA"), (w, 0))
    return out


def fit_h(im, th):
    w, h = im.size
    return im.resize((max(1, round(w * th / h)), th), Image.LANCZOS)


def shadow_of(sprite, blur, op):
    a = sprite.split()[3].point(lambda v: int(v * op))
    sh = Image.new("RGBA", sprite.size, (0, 0, 0, 0)); sh.putalpha(a)
    return sh.filter(ImageFilter.GaussianBlur(blur))


# ---------- load ------------------------------------------------------------
imgs = {n: Image.open(f"{ROOT}/{n}.png").convert("RGB") for n in ("1", "2", "3", "4")}
covers = {n: cover_3d(trim_bg(imgs[n])) for n in imgs}


# ---------- brand-orange background -----------------------------------------
yy = np.linspace(0, 1, H)[:, None]; xx = np.linspace(0, 1, W)[None, :]
br = np.array(BRAND, float)
base = np.ones((H, W, 3)) * br

# warm highlight glow behind the centre (spotlight the hero)
d = np.sqrt(((xx - 0.5) * 1.2) ** 2 + (yy - 0.42) ** 2)
base += (np.clip(1 - d / 0.6, 0, 1) ** 2)[:, :, None] * np.array([60, 60, 40])
# deepen toward the edges / bottom for depth
base -= (np.clip((d - 0.45) * 1.1, 0, 1))[:, :, None] * np.array([95, 55, 30])
base -= (np.clip((yy - 0.7) / 0.3, 0, 1))[:, :, None] * np.array([70, 45, 25])

bg = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")


# ---------- place covers upright ---------------------------------------------
baseline = int(H * 0.84)
shad  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
refl  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
books = Image.new("RGBA", (W, H), (0, 0, 0, 0))

# (cover, height_frac, centre_x_frac)   back -> front
layout = [
    (covers["2"], 0.56, 0.135),   # Before You Send  (left outer)
    (covers["1"], 0.58, 0.320),   # Offer Positioning(left inner)
    (covers["4"], 0.57, 0.715),   # Dead Lead Revival(right, tucked near main)
    (covers["3"], 0.74, 0.500),   # MAIN  middle, biggest, front
]

# first pass: size + position each cover, then shift the whole group so it sits
# centred with equal margins on the left and right
placed = []
for cov, hf, cxf in layout:
    s = fit_h(cov, int(H * hf))
    w, h = s.size
    x = round(W * cxf - w / 2); y = baseline - h
    placed.append((s, x, y, w, h))

gl = min(p[1] for p in placed)
gr = max(p[1] + p[3] for p in placed)
shift = round((W - (gr - gl)) / 2 - gl)

for s, x, y, w, h in placed:
    x += shift
    shad.alpha_composite(shadow_of(s, 16, 0.42), (x + 10, y + 18))   # drop shadow
    shad.alpha_composite(shadow_of(s, 6, 0.30), (x + 3, y + 6))      # contact shadow
    m = s.transpose(Image.FLIP_TOP_BOTTOM)
    ma = np.asarray(m).astype(float)
    ma[:, :, 3] *= np.clip(np.linspace(0.22, 0.0, h), 0, 1)[:, None]
    refl.alpha_composite(Image.fromarray(np.clip(ma, 0, 255).astype(np.uint8), "RGBA"), (x, baseline))
    books.alpha_composite(s, (x, y))

refl = refl.filter(ImageFilter.GaussianBlur(2))

out = bg
out = Image.alpha_composite(out, shad)
out = Image.alpha_composite(out, refl)
out = Image.alpha_composite(out, books)

out = out.convert("RGB")
out.save(f"{ROOT}/bundle.png")
out.save(f"{ROOT}/public/bundle.png")
print(f"saved bundle.png ({W}x{H})")
