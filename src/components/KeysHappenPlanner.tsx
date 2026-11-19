"use client";
import { useMemo, useState } from "react";

export function KeysHappenPlanner() {
 const [first,setFirst]=useState(""); const [backup,setBackup]=useState(""); const [help,setHelp]=useState("");
 const [shared,setShared]=useState(false);
 const safe=(s:string)=>s.trim().slice(0,90).replace(/[\r\n<>]/g," ");
 const card=useMemo(()=>["KEYS HAPPEN · HOUSEHOLD BACKUP PLAN","First contact: "+(safe(first)||"Choose someone"),"Backup contact: "+(safe(backup)||"Choose someone"),"Where to seek locksmith help: "+(safe(help)||"Find a verified local service"),"Check your lawful access options first. Confirm scope and price before authorizing work.","Never include door codes, passwords or spare-key locations."].join("\n"),[first,backup,help]);
 async function share(){ if(navigator.share){try{await navigator.share({title:"Keys Happen Plan",text:card});setShared(true);return;}catch{}} await navigator.clipboard.writeText(card);setShared(true);}
 return <div className="kh-card mx-auto max-w-5xl rounded-3xl border p-7 sm:p-10" id="make-plan">
  <div className="kh-kicker">Free · No account needed</div><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Make your household plan.</h2>
  <p className="mt-2 max-w-2xl text-sm opacity-75">Agree on who to call and where to find help. Only enter contact names or generic instructions here. This plan stays on your device until you choose to share it.</p>
  <div className="mt-7 grid gap-4 sm:grid-cols-3">
  {[[first,setFirst,"1. First call","e.g. Partner or building manager"],[backup,setBackup,"2. Backup contact","e.g. Neighbor"],[help,setHelp,"3. Where to get help","e.g. TLNM concierge"]] .map(([value,setter,label,placeholder],i)=><label key={i} className="block text-sm font-semibold">{label as string}<input maxLength={90} value={value as string} onChange={e=>(setter as (s:string)=>void)(e.target.value)} placeholder={placeholder as string} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900" /></label>)}
  </div>
  <div className="mt-5 rounded-2xl bg-lime-100 p-5 text-sm text-slate-950"><strong>Shareable card preview</strong><pre className="mt-3 whitespace-pre-wrap font-sans leading-7">{card}</pre></div>
  <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={share} className="kh-primary rounded-full px-6 py-3 font-bold">Share / copy my plan →</button><button type="button" onClick={()=>window.print()} className="rounded-full border border-slate-400 px-6 py-3 font-semibold">Save as PDF / print</button></div>
  {shared&&<p role="status" className="mt-3 text-sm">Your plan is ready to share. Review it before sending.</p>}
  <p className="mt-4 text-xs opacity-70">Privacy: do not enter door codes, access credentials, security instructions or spare-key locations. No data is sent to TLNM by this form.</p>
 </div>;
}
