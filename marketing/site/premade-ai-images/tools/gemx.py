# gem.py with aspect ratio + 2K output; counts calls in calls.log
import base64, json, sys, urllib.request, time, os
model, inp, out, prompt, ar = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
parts=[]
if inp!='-':
    parts.append({"inline_data":{"mime_type":"image/jpeg","data":base64.b64encode(open(inp,'rb').read()).decode()}})
parts.append({"text":prompt})
size = sys.argv[6] if len(sys.argv)>6 else "2K"
body = {"contents":[{"parts":parts}],"generationConfig":{"responseModalities":["IMAGE"],"imageConfig":{"aspectRatio":ar,"imageSize":size}}}
with open(os.path.join(os.path.dirname(__file__),'calls.log'),'a') as f: f.write(f"{time.strftime('%H:%M:%S')}\t{model}\t{out}\n")
req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    data=json.dumps(body).encode(), headers={"Content-Type":"application/json"})
r = json.load(urllib.request.urlopen(req, timeout=300))
for c in r.get("candidates",[]):
    for p in c.get("content",{}).get("parts",[]):
        d = p.get("inline_data") or p.get("inlineData")
        if d: open(out,'wb').write(base64.b64decode(d["data"])); print("saved", out); sys.exit(0)
print(json.dumps(r)[:600]); sys.exit(1)
