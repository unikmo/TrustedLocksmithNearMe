#!/usr/bin/env python3
"""Non-destructive public-production E2E for TLNM. Never creates accounts or jobs."""
import asyncio, json, os, sys, time
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

BASE=os.environ.get("TLNM_PRODUCTION_URL","https://trustedlocksmithnearme.com").rstrip("/")
OUT=Path("artifacts/production-e2e"); OUT.mkdir(parents=True,exist_ok=True)
RESULTS=[]
def record(name,ok,detail="",severity="P1"):
    entry={"test":name,"result":"PASS" if ok else "FAIL","detail":str(detail)[:550],"severity":severity}
    RESULTS.append(entry)
    print(json.dumps(entry),flush=True)

async def run():
  async with async_playwright() as p:
    browser=await p.chromium.launch(headless=True,args=["--no-sandbox"])
    for device,width,height in [("desktop",1440,900),("mobile",390,844)]:
      context=await browser.new_context(viewport={"width":width,"height":height},device_scale_factor=1,permissions=["clipboard-read","clipboard-write"],ignore_https_errors=False)
      page=await context.new_page()
      errors=[]
      page.on("pageerror",lambda exc:errors.append(str(exc)[:220]))
      for path,fragment in [
       ("/","Keys happen."),("/keys-happen","Your future self will thank you."),
       ("/pricing","An extra cushion?"),("/for-businesses","Many doors. Fewer headaches."),
       ("/for-locksmiths","More jobs that fit."),("/faq","The useful stuff"),
       ("/how-it-works","Small plan. Big difference."),
       ("/concierge","Locked out?"),("/contact","Start here."),
       ("/for-property-managers","property"),("/landlords","landlord"),
       ("/for-real-estate-agents","handover"),("/locations","Massachusetts"),
       ("/services","price"),("/services/turnover-rekeying","rekey"),
       ("/services/master-key-systems","key"),("/services/access-control","access"),
       ("/guides/turnover-rekey-cost","calculator"),("/boston-ma","Boston"),
       ("/boston-ma/turnover-rekeying","rekey"),("/partner-tech","Good jobs."),
      ]:
        name=f"{device} {path}"
        try:
          response=await page.goto(BASE+path,wait_until="domcontentloaded",timeout=30000)
          await page.wait_for_timeout(550)
          text=await page.locator("body").inner_text(timeout=10000)
          status=response.status if response else 0
          record(name, status==200 and fragment.lower() in text.lower(), f"HTTP {status}, title={await page.title()!r}, snippet={text[:160]!r}")
          if path=="/":
            record(f"{device} hero tagline","A little foresight. A lot less drama." in text,text[:350])
            record(f"{device} operator","TSquare Ventures LLC" in text,"TSquare footer present")
          if path=="/pricing":
            flags={"price":"$30" in text, "benefit":"$100" in text, "closed":("enrollment closed" in text.lower() or "not yet" in text.lower() or "enrollment isn't open" in text.lower())}
            record(f"{device} membership closed",all(flags.values()),f"Flags={flags}, content excerpt={text[:800]!r}")
            record(f"{device} pricing canonical path",page.url.rstrip("/") == BASE+"/pricing",f"Actual final URL: {page.url}")
          if path=="/for-businesses":
            record(f"{device} business disclosure",("Pilot enquiries" in text or "Availability" in text),"No promise of confirmed availability")
          if path=="/faq":
            record(f"{device} FAQ scope",("24-hour" in text or "24 hours" in text) and "TSquare Ventures LLC" in text,"Contains operator and optional quote detail")
            first=page.locator("main details summary").first
            await first.click()
            record(f"{device} FAQ expands",await page.locator("main details").first.evaluate("(el)=>el.open"),"Disclosure can open")
          overflow=await page.evaluate("document.documentElement.scrollWidth > window.innerWidth+3")
          record(f"{device} horizontal overflow {path}",not overflow,"No significant horizontal scroll",severity="P2")
          if path in ["/","/keys-happen","/for-businesses","/pricing"]:
            await page.screenshot(path=str(OUT/f"{device}-{path.strip('/').replace('/','-') or 'home'}.png"),full_page=True)
          if path=="/":
            cta=page.get_by_role("link",name="Make my free plan").first
            await cta.click(timeout=5000)
            await page.wait_for_timeout(500)
            top=await page.locator("#make-plan").evaluate("(el)=>Math.round(el.getBoundingClientRect().top)")
            record(f"{device} free CTA scroll",page.url.endswith("#make-plan") or abs(top)<200,f"URL after click: {page.url}; plan top relative to viewport={top}")
          if path=="/keys-happen":
            selects=page.locator("#make-plan select")
            record(f"{device} planner inputs",await selects.count()==3, "3 preset selectors; no free-text secrets")
            if await selects.count()==3:
              await selects.nth(0).select_option(index=1)
              await selects.nth(1).select_option(index=2)
              card=await page.locator("#make-plan pre").inner_text()
              record(f"{device} planner interactive", "Trusted family member" in card and "Building manager" in card,card[:250])
              free_text=await page.locator("#make-plan input, #make-plan textarea").count()
              record(f"{device} planner privacy",free_text==0,f"Free text fields={free_text}")
              try:
                await page.get_by_role("button",name="Share the backup plan").click(timeout=5000)
                notice=await page.locator("#make-plan [role=status]").inner_text(timeout=5000)
                record(f"{device} share control",bool(notice),notice)
              except Exception as e:record(f"{device} share control",False,repr(e))
              try:
                pdf=await page.pdf(print_background=True,format="A4")
                record(f"{device} print PDF",len(pdf)>1000,f"PDF bytes {len(pdf)}")
              except Exception as e:record(f"{device} print PDF",False,repr(e))
          if path=="/concierge":
            record(f"{device} emergency disclaimer","not monitored as an emergency" in text.lower() or "not an emergency" in text.lower(),"Customer not falsely promised dispatch")
        except Exception as e:
          record(name,False,repr(e),"P0")
      record(f"{device} runtime page errors",len(errors)==0,errors[:8])
      await context.close()
    # Safety circuit breaker: route should redirect and intake should not accept an unauthenticated request
    page=await browser.new_page()
    for path in ["/book","/business-enquiry"]:
      try:
        response=await page.goto(BASE+path,wait_until="domcontentloaded",timeout=30000)
        text=await page.locator("body").inner_text()
        final_url=page.url
        if path=="/book": ok=("/property-manager" in final_url or "/business-enquiry" in final_url) and not any(x in text.lower() for x in ["pay now", "confirm booking"])
        else: ok="temporarily unavailable" in text.lower() or "not accepting" in text.lower() or "email" in text.lower()
        record(f"closed operational route {path}",ok,f"HTTP {response.status if response else 0}; final={final_url}; snippet={text[:160]}")
      except Exception as e:record(f"closed operational route {path}",False,repr(e))
    await browser.close()
  data={"url":BASE,"timestamp_unix":int(time.time()),"results":RESULTS,"passed":sum(x["result"]=="PASS" for x in RESULTS),"failed":sum(x["result"]=="FAIL" for x in RESULTS)}
  (OUT/"report.json").write_text(json.dumps(data,indent=2),encoding="utf-8")
  print("TLNM_E2E_REPORT="+json.dumps({"passed":data["passed"],"failed":data["failed"]}),flush=True)
  return 1 if data["failed"] else 0
if __name__=="__main__":
  sys.exit(asyncio.run(run()))
