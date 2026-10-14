import hashlib, os
SP = "/tmp/claude-0/-home-user-memobrick/6c2afd08-63fe-5a7d-83a8-1df45d57cf83/scratchpad/"
s = open(SP + "live/memobrick.js", encoding="utf-8", newline="").read()

def rep(s, a, b):
    assert s.count(a) == 1, a[:60]
    return s.replace(a, b)

md5 = lambda t: hashlib.md5(t.encode()).hexdigest()

# A-2026W42-022 sticky bar
head = '(()=>{"use strict";'
assert s.startswith(head) or s.count(head) == 1
s = s.replace(head, head + '{const e=document.createElement("style");e.setAttribute("data-mb-sticky-topbar","");e.textContent="@media(min-width:641px){.ed-topbar{position:sticky;top:60px;z-index:35}}@media(min-width:1021px){.ed-topbar{top:76px}}",document.head.appendChild(e)}', 1)
s = rep(s, 'a=window.innerWidth<1021?60:76,s=', 'a=(window.innerWidth<1021?60:76)+(document.querySelector("#edTopbar")?.offsetHeight||0),s=')
print("022 only", md5(s))
# A-2026W42-021 cart drawer
s = rep(s, 'x.items.forEach(k=>{const S=document.createElement("div");if(S.className="cart-drawer-item",k.image){const $=document.createElement("img");$.src=k.image+"&width=120",',
        'x.items.forEach(k=>{const S=document.createElement("div"),mbD=k.properties&&/^https:\\/\\//.test(k.properties["Final Design"]||"")?k.properties["Final Design"]:"";if(S.className="cart-drawer-item",mbD||k.image){const $=document.createElement("img");$.src=mbD||k.image+"&width=120",')
s = rep(s, '$.textContent=k.variant_title,w.appendChild($)', '$.textContent=/Build at home/.test(k.variant_title)?"Build-at-home kit":k.variant_title,w.appendChild($)')
print("022+021", md5(s), "(working copy 5fb7938f5f63c2c99e02864db353e838)")
# A-2026W42-013 Pro Design keeps size
s = rep(s, 'const f={file:null,sizeId:null,showAll:!1},m=["16x16","20x20","20x30","30x30"],',
        'const m=["16x16","20x20","20x30","30x30"],mbQ=new URLSearchParams(location.search).get("size"),mbK=mbQ&&Se.some(w=>w.id===mbQ)?mbQ:null,f={file:null,sizeId:mbK,showAll:!!mbK&&m.indexOf(mbK)<0},')
print("022+021+013", md5(s))
os.makedirs(SP + "new", exist_ok=True)
open(SP + "new/memobrick.js", "w", encoding="utf-8", newline="").write(s)
