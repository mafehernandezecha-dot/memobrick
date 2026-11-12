import re
P='marketing/social/planner/2026-W49/'
rows=[]
for pid in ['S-20261130-1','S-20261201-1','S-20261202-1','S-20261203-1','S-20261204-1','S-20261205-1','S-20261206-1']:
    s=open('/home/user/memobrick/'+P+pid+'.md').read()
    camp=re.search(r'- Campaign: (.*)',s).group(1)
    when=re.search(r'- Scheduled time \(ET\): (.*)',s).group(1)
    cta=re.search(r'## Call to action\n\n(.*)\.',s).group(1)
    reel='(Reel)' in s.split('- Channel(s):')[1].split('\n')[0]
    chans=[('ig','Instagram','instagram'),('fb','Facebook','facebook'),('tt','TikTok','tiktok'),('pin','Pinterest','pinterest')]+([('yt','YouTube','youtube')] if reel else [])
    for suf,name,key in chans:
        url=re.search(r'- %s: (http\S+)'%name,s).group(1)
        asset=P+pid+('.mp4' if reel else ('-pin.png' if suf=='pin' else '.png'))
        rows.append(f'| {pid}-{suf} | {camp} | {name} | {asset} | {P}{pid}.md | {cta} | {url} | {when} | Ready |  |  |  |')
open('/home/user/memobrick/marketing/shared/content-calendar.md','a').write('\n'.join(rows)+'\n')
print(len(rows))
