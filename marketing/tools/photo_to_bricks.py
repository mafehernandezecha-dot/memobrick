"""Make a vertical clip where a photo turns into a 1x1 brick mosaic.

Usage: python3 marketing/tools/photo_to_bricks.py <photo> <out.mp4> [--studs 48] [--seconds 4]

The photo holds, pixelates step by step, then each square gets a round stud so
it reads as 1x1 bricks, and the finished mosaic holds. 1080x1920, 30 fps, no
audio. Use it as one shot inside a reel (the transformation moment).
"""
import argparse
import subprocess

from PIL import Image, ImageDraw, ImageFilter

W, H, FPS = 1080, 1920, 30


def cover(im):
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def bricks(im, cols, studs):
    rows = round(cols * H / W)
    # A limited palette, like a real kit's 40+ brick colors.
    small = im.resize((cols, rows), Image.BILINEAR).quantize(colors=40, method=Image.Quantize.MEDIANCUT).convert("RGB")
    cell = W / cols
    out = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(out)
    for j in range(rows):
        for i in range(cols):
            r, g, b = small.getpixel((i, j))
            x0, y0 = i * cell, j * cell
            d.rectangle((x0, y0, x0 + cell, y0 + cell), fill=(r, g, b))
            if studs:
                # A round stud: darker rim, lighter top, small highlight.
                pad = cell * 0.18
                d.ellipse((x0 + pad, y0 + pad, x0 + cell - pad, y0 + cell - pad), fill=tuple(int(c * 0.82) for c in (r, g, b)))
                pad2 = cell * 0.24
                d.ellipse((x0 + pad2, y0 + pad2 - 1, x0 + cell - pad2, y0 + cell - pad2 - 1), fill=tuple(min(255, int(c * 1.08) + 6) for c in (r, g, b)))
                h = cell * 0.12
                d.ellipse((x0 + cell * 0.32, y0 + cell * 0.30, x0 + cell * 0.32 + h, y0 + cell * 0.30 + h), fill=tuple(min(255, c + 45) for c in (r, g, b)))
            d.line((x0, y0 + cell - 1, x0 + cell, y0 + cell - 1), fill=tuple(int(c * 0.7) for c in (r, g, b)))
            d.line((x0 + cell - 1, y0, x0 + cell - 1, y0 + cell), fill=tuple(int(c * 0.75) for c in (r, g, b)))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("photo")
    ap.add_argument("out")
    ap.add_argument("--studs", type=int, default=48, help="bricks across the width")
    ap.add_argument("--seconds", type=float, default=4)
    a = ap.parse_args()

    src = cover(Image.open(a.photo).convert("RGB"))
    n = int(a.seconds * FPS)
    hold1, steps, hold2 = int(n * 0.2), int(n * 0.45), n - int(n * 0.2) - int(n * 0.45)
    final = bricks(src, a.studs, True)
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                           "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", a.out], stdin=subprocess.PIPE)
    for _ in range(hold1):
        ff.stdin.write(src.tobytes())
    for k in range(steps):
        # From fine to the final brick grid, on a curve so the end slows down.
        t = (k + 1) / steps
        cols = max(a.studs, int(W / (1 + (W / a.studs - 1) * t ** 0.6)))
        frame = src.resize((cols, round(cols * H / W)), Image.BILINEAR).resize((W, H), Image.NEAREST)
        if k > steps * 0.7:
            frame = Image.blend(frame, final, (k - steps * 0.7) / (steps * 0.3))
        ff.stdin.write(frame.tobytes())
    for _ in range(hold2):
        ff.stdin.write(final.tobytes())
    ff.stdin.close()
    ff.wait()
    print(f"wrote {a.out}")


if __name__ == "__main__":
    main()
