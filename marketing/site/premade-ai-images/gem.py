import base64, json, sys, urllib.request
model, inp, out, prompt = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
img = base64.b64encode(open(inp,'rb').read()).decode()
body = {"contents":[{"parts":[{"inline_data":{"mime_type":"image/jpeg","data":img}},{"text":prompt}]}],
        "generationConfig":{"responseModalities":["IMAGE"]}}
req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
    data=json.dumps(body).encode(), headers={"Content-Type":"application/json"})
r = json.load(urllib.request.urlopen(req, timeout=180))
for c in r.get("candidates",[]):
    for p in c.get("content",{}).get("parts",[]):
        d = p.get("inline_data") or p.get("inlineData")
        if d: open(out,'wb').write(base64.b64decode(d["data"])); print("saved", out); sys.exit(0)
print(json.dumps(r)[:600])
