"""Compose the bundle showcase: the three bonus covers (1 = Offer Positioning,
2 = Before You Send, 4 = Dead Lead Revival) fanned around the new main cover
(bun.png, a 3D book render) in the centre, on the brand-green background.
Saves to bundle.png.

Note: 3.png is the OLD main cover ("I'm Not Interested") and is deliberately
NOT used here. bun.png is the corrected main cover and stays untouched.
"""
from PIL import Image, ImageFilter
import numpy as np

ROOT = r"C:\Users\HP\Desktop\SALES"
BRAND = (22, 163, 74)         # #16A34A money-green
W, H = 1280, 800


def fit_h(im, th):
    w, h = im.size
    return im.resize((max(1, round(w * th / h)), th), Image.LANCZOS)


def shadow_of(sprite, blur, op):
    a = sprite.split()[3].point(lambda v: int(v * op))
    sh = Image.new("RGBA", sprite.size, (0, 0, 0, 0)); sh.putalpha(a)
    return sh.filter(ImageFilter.GaussianBlur(blur))


# ---------- load (opaque rectangular covers) --------------------------------
names = {"2": "2.png", "1": "1.png", "4": "4.png", "bun": "bun.png"}
covers = {k: Image.open(f"{ROOT}/{v}").convert("RGBA") for k, v in names.items()}


# ---------- brand-green background -------------------------------------------
yy = np.linspace(0, 1, H)[:, None]; xx = np.linspace(0, 1, W)[None, :]
base = np.ones((H, W, 3)) * np.array(BRAND, float)
# lighter-green spotlight behind the centre (hero the main cover)
d = np.sqrt(((xx - 0.5) * 1.15) ** 2 + (yy - 0.42) ** 2)
base += (np.clip(1 - d / 0.6, 0, 1) ** 2)[:, :, None] * np.array([46, 60, 46])
# deepen toward the edges and bottom for depth
base -= (np.clip((d - 0.5) * 1.2, 0, 1))[:, :, None] * np.array([30, 48, 30])
base -= (np.clip((yy - 0.7) / 0.3, 0, 1))[:, :, None] * np.array([26, 42, 26])
bg = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")


# ---------- place covers upright ---------------------------------------------
baseline = int(H * 0.86)
shad  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
refl  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
books = Image.new("RGBA", (W, H), (0, 0, 0, 0))

# (cover, height_frac, centre_x_frac)   back -> front
# (cover, height_frac, centre_x_frac, baseline_nudge_px)   back -> front
layout = [
    (covers["2"], 0.560, 0.150, 0),    # Before You Send   (far left, back)
    (covers["1"], 0.590, 0.310, 0),    # Offer Positioning (left, behind main)
    (covers["4"], 0.575, 0.700, 0),    # Dead Lead Revival (right, behind main)
    (covers["bun"], 0.760, 0.500, 40), # MAIN cover (centre, front, dropped to sit level)
]

placed = []
for cov, hf, cxf, dy in layout:
    # Trim to the SOLID book so every book's real bottom sits on the baseline.
    # Thresholding the alpha ignores bun.png's faint baked shadow/reflection,
    # which would otherwise leave the solid cover floating above the line.
    a = cov.split()[3]
    bb = a.point(lambda v: 255 if v > 60 else 0).getbbox()
    if bb:
        cov = cov.crop(bb)
    s = fit_h(cov, int(H * hf))
    w, h = s.size
    bl = baseline + dy
    x = round(W * cxf - w / 2); y = bl - h
    placed.append((s, x, y, w, h, bl))

# centre the whole group with equal left/right margins
gl = min(p[1] for p in placed)
gr = max(p[1] + p[3] for p in placed)
shift = round((W - (gr - gl)) / 2 - gl)

for s, x, y, w, h, bl in placed:
    x += shift
    shad.alpha_composite(shadow_of(s, 18, 0.42), (x + 12, y + 20))  # drop shadow
    shad.alpha_composite(shadow_of(s, 7, 0.30), (x + 4, y + 7))     # contact shadow
    m = s.transpose(Image.FLIP_TOP_BOTTOM)
    ma = np.asarray(m).astype(float)
    ma[:, :, 3] *= np.clip(np.linspace(0.20, 0.0, h), 0, 1)[:, None]
    refl.alpha_composite(Image.fromarray(np.clip(ma, 0, 255).astype(np.uint8), "RGBA"), (x, bl))
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
