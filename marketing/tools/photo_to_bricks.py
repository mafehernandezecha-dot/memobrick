"""Make a vertical clip where a photo turns into a 1x1 brick mosaic.

Usage: python3 marketing/tools/photo_to_bricks.py <photo> <out.mp4> [--studs 36] [--seconds 5] [--style build|dissolve]

The photo holds, then the bricks are pressed in row by row from the top
(build) or all fade in at once (dissolve), and the finished mosaic holds with a
slow push-in. Bricks are shaded like glossy plastic: a beveled top, a round
stud with a highlight and a shadow. 1080x1920, 30 fps, no audio. Use it as the
transformation shot inside a reel. Pick a photo where the face or pet fills
the frame; fewer studs (30 to 40 across) read better on a phone.
"""
import argparse
import subprocess

import numpy as np
from PIL import Image

W, H, FPS = 1080, 1920, 30


def cover(im):
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def brick_tile(c):
    """Shading for one brick, c x c: (multiplier, specular), lit from the top left."""
    n = c * 4
    y, x = np.mgrid[0:n, 0:n] / n
    mul = np.full((n, n), 1.0)
    # Bevel: lighter top and left edges, darker bottom and right edges, dark gap.
    e = 0.06
    mul[(y < e) | (x < e)] = 1.12
    mul[(y > 1 - e) | (x > 1 - e)] = 0.72
    mul[(y > 1 - 0.02) | (x > 1 - 0.02)] = 0.45
    cx, cy, r = 0.5, 0.47, 0.30
    d = np.hypot(x - cx, y - cy)
    # Stud shadow falling to the bottom right.
    ds = np.hypot(x - cx - 0.05, y - cy - 0.06)
    mul[(ds < r) & (d >= r)] *= 0.78
    # Stud side (a darker ring), then the stud top with a soft gradient.
    side = (d < r) & (d >= r * 0.86)
    mul[side] = 0.80 + 0.25 * ((cx - x[side]) + (cy - y[side])) / r
    top = d < r * 0.86
    mul[top] = 1.04 + 0.10 * ((cx - x[top]) + (cy - y[top])) / r
    spec = np.zeros((n, n))
    dh = np.hypot(x - (cx - 0.11), y - (cy - 0.11))
    spec += np.clip(1 - dh / 0.09, 0, 1) ** 2 * 0.55
    spec += np.clip(1 - np.abs(d - r * 0.93) / 0.03, 0, 1) * ((x < cx) & (y < cy)) * 0.25
    small = lambda a: np.asarray(Image.fromarray((a * 100).astype(np.float32), mode="F").resize((c, c), Image.LANCZOS)) / 100
    return small(mul), small(spec)


def mosaic_cells(im, cols):
    rows = round(cols * H / W)
    small = im.resize((cols, rows), Image.LANCZOS).quantize(colors=48, method=Image.Quantize.FASTOCTREE).convert("RGB")
    return np.asarray(small, dtype=np.float32), rows


def render(colors, tile):
    mul, spec = tile
    rows, cols, _ = colors.shape
    c = mul.shape[0]
    out = colors[:, None, :, None, :] * mul[None, :, None, :, None] + 255 * spec[None, :, None, :, None]
    return out.reshape(rows * c, cols * c, 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("photo")
    ap.add_argument("out")
    ap.add_argument("--studs", type=int, default=36)
    ap.add_argument("--seconds", type=float, default=5)
    ap.add_argument("--style", default="build", choices=["build", "dissolve"])
    a = ap.parse_args()

    src = cover(Image.open(a.photo).convert("RGB"))
    colors, rows = mosaic_cells(src, a.studs)
    cols = a.studs
    c = int(np.ceil(W / a.studs))
    tile = brick_tile(c)
    full = np.clip(render(colors, tile), 0, 255)
    fit = lambda arr: np.asarray(Image.fromarray(arr.astype(np.uint8)).resize((W, H), Image.LANCZOS), np.float32)
    final = fit(full)
    photo = np.asarray(src, np.float32)

    n = int(a.seconds * FPS)
    n1, n2 = int(n * 0.15), int(n * 0.5)
    n3 = n - n1 - n2
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", a.out], stdin=subprocess.PIPE)
    put = lambda arr: ff.stdin.write(np.clip(arr, 0, 255).astype(np.uint8).tobytes())
    for _ in range(n1):
        put(photo)
    for k in range(n2):
        t = (k + 1) / n2
        if a.style == "build":
            # Bricks go in row by row from the top, left to right inside each row.
            placed = int(rows * cols * t)
            grid = np.zeros(rows * cols, np.float32)
            grid[:placed] = 1
            mask = np.asarray(Image.fromarray((grid.reshape(rows, cols) * 255).astype(np.uint8)).resize((W, H), Image.NEAREST), np.float32)[..., None] / 255
            # Unplaced area shows the photo, slightly faded, so you see where the bricks go.
            frame = final * mask + (photo * 0.85 + 255 * 0.15) * (1 - mask)
        else:
            frame = photo * (1 - t) + final * t
        put(frame)
    for k in range(n3):
        z = 1 + 0.06 * (k + 1) / n3
        zw, zh = int(W / z), int(H / z)
        x0, y0 = (W - zw) // 2, (H - zh) // 2
        put(np.asarray(Image.fromarray(final.astype(np.uint8)).crop((x0, y0, x0 + zw, y0 + zh)).resize((W, H), Image.LANCZOS), np.float32))
    ff.stdin.close()
    ff.wait()
    Image.fromarray(final.astype(np.uint8)).save(a.out.rsplit(".", 1)[0] + "-final.png")
    print(f"wrote {a.out}")


if __name__ == "__main__":
    main()
