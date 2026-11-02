from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit

class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.h1=0;self.canonical=[];self.description=[];self.robots=[];self.links=[];self.in_json=False;self.ld=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1': self.h1+=1
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='meta' and a.get('name')=='description':self.description.append(a.get('content'))
  if tag=='meta' and a.get('name')=='robots':self.robots.append(a.get('content',''))
  if tag=='a':self.links.append(a.get('href',''))
  self.in_json=tag=='script' and a.get('type')=='application/ld+json'
 def handle_data(self,data):
  if self.in_json:self.ld.append(json.loads(data))
 def handle_endtag(self,tag):
  if tag=='script':self.in_json=False
root=Path('.next/server/app');base='https://trustedlocksmithnearme.com'
urls=[e.text for e in ET.fromstring((root/'sitemap.xml.body').read_text()).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls)==len(set(urls))
checked=0;dynamic=[]
for url in urls:
 path=urlsplit(url).path
 assert not any(x in path for x in ['/book','/pricing','/digital-access','/second-homes','/activate','/car-lockout','/house-lockout','/emergency-locksmith']),path
 file=root/((path.lstrip('/') or 'index')+'.html')
 if not file.exists():dynamic.append(path);continue
 p=Page();p.feed(file.read_text())
 assert p.h1==1,(path,'heading count',p.h1)
 assert p.canonical==[base+path],(path,'canonical',p.canonical)
 assert len(p.description)==1 and p.description[0],(path,'description')
 assert not any('noindex' in r for r in p.robots),(path,'indexed sitemap points to noindex')
 assert not any(h=='/book' or h.startswith('/book/') or h=='/pricing' for h in p.links),(path,'consumer CTA')
 assert p.ld,(path,'missing schema')
 checked+=1
p=Page();p.feed((root/'new-york-ny.html').read_text());assert any('noindex' in r for r in p.robots)
assert base+'/new-york-ny' not in urls
robots=(root/'robots.txt.body').read_text()
for bot in ['OAI-SearchBot','ChatGPT-User','Googlebot','Bingbot','PerplexityBot']:assert bot in robots
print(f'SEO checks passed: {checked} built pages; {len(urls)} sitemap URLs; {len(dynamic)} dynamic routes require browser/provider checks: {dynamic}')
