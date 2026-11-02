import re
css=open('live-memobrick.css').read()
css=re.sub(r'/\*.*?\*/','',css,flags=re.S)
def walk(s, media=None, out=None):
    i=0; n=len(s)
    while i<n:
        j=s.find('{',i)
        if j<0: break
        head=s[i:j].strip()
        # find matching brace
        depth=1;k=j+1
        while depth and k<n:
            if s[k]=='{': depth+=1
            elif s[k]=='}': depth-=1
            k+=1
        body=s[j+1:k-1]
        if head.startswith('@media'):
            walk(body, head[6:].strip(), out)
        elif head.startswith('@'):
            pass
        else:
            out.append((media, head, body))
        i=k
    return out
rules=walk(css,None,[])
def pre(sel):
    parts=[p.strip() for p in sel.split(',')]
    return ','.join(('html '+p) if not p.startswith(('html',':root')) else p for p in parts)
lab=[]
for media,sel,body in rules:
    if 'var(--mono)' in body and re.search(r'text-transform:\s*uppercase',body):
        lab.append((media,sel))
print(len(lab))
from collections import OrderedDict
g=OrderedDict()
for m,s in lab: g.setdefault(m,[]).append(s)
lines=[]
for m,sels in g.items():
    rule=',\n'.join(pre(s) for s in sels)+'{font-weight:600;letter-spacing:.08em}'
    lines.append(f'@media {m}{{\n{rule}\n}}' if m else rule)
open('labels.css','w').write('\n'.join(lines)+'\n')
print(open('labels.css').read()[:3000])
print([m for m in g])
