import json,sys,collections
d=json.load(open(sys.argv[1]))
detail = len(sys.argv)>2
for k,v in d.items():
    els=v['els']
    fam=collections.Counter(e['fam'] for e in els)
    small=[e for e in els if e['size']<14]
    print(f"== {k}: {len(els)} text els; fams {dict(fam)}; <14px: {len(small)}; mono: {sum(1 for e in els if 'Mono' in e['fam'] or 'mono' in e['fam'])}")
    print('   fonts loaded:', v['fonts'])
    if detail and k.startswith('phone'):
        for e in small: print('   ', e['size'], e['fam'], e['weight'], e['sel'][:50], '<', e['parent'][:25], 'inline' if e['inlineSize'] else '', '|', e['text'][:35], e['fixed'])
