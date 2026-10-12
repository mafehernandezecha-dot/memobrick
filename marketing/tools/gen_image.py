"""Generate a social image with Google's Gemini image model.

Usage: python3 marketing/tools/gen_image.py "<prompt>" <out.png> [--aspect 4:5] [--ref photo.jpg ...]

The key comes from the cloud environment's settings, never the repo: either a
network secret the proxy adds to requests to generativelanguage.googleapis.com,
or a GEMINI_API_KEY environment variable. GEMINI_IMAGE_MODEL overrides the
model. --ref adds real product photos for the model to stay faithful to.
"""
import argparse
import base64
import json
import mimetypes
import os
import sys
import urllib.error
import urllib.request

MODEL = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-2.5-flash-image")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("prompt")
    ap.add_argument("out")
    ap.add_argument("--aspect", default="4:5")
    ap.add_argument("--ref", action="append", default=[])
    args = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY")

    parts = [{"text": args.prompt}]
    for path in args.ref:
        mime = mimetypes.guess_type(path)[0] or "image/jpeg"
        with open(path, "rb") as f:
            parts.append({"inlineData": {"mimeType": mime, "data": base64.b64encode(f.read()).decode()}})
    body = {
        "contents": [{"parts": parts}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": args.aspect}},
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
        data=json.dumps(body).encode(),
        headers={"content-type": "application/json", **({"x-goog-api-key": key} if key else {})},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as res:
            data = json.load(res)
    except urllib.error.HTTPError as e:
        hint = "" if key or e.code not in (400, 401, 403) else " No key found: the owner adds a Gemini network secret (or GEMINI_API_KEY) in the cloud environment's settings."
        sys.exit(f"Gemini returned {e.code}: {e.read().decode()[:500]}{hint}")

    for cand in data.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline:
                with open(args.out, "wb") as f:
                    f.write(base64.b64decode(inline["data"]))
                print(f"wrote {args.out}")
                return
    sys.exit(f"No image in the response: {json.dumps(data)[:500]}")


if __name__ == "__main__":
    main()
