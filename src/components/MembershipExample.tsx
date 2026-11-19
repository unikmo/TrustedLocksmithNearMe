"use client";
import {useMemo,useState} from "react";
import {calculateKeysHappenBenefit} from "@/lib/keys-happen-benefit";
const money=(n:number)=>"$"+(n/100).toFixed(2);
export function MembershipExample(){
 const [labor,setLabor]=useState(99);
 const [materials,setMaterials]=useState(0);
 const [used,setUsed]=useState(0);
 const q=useMemo(()=>calculateKeysHappenBenefit({
  laborCents:labor*100,materialsCents:materials*100,alreadyRedeemedCents:used*100
 }),[labor,materials,used]);
 return <div className="kh-card rounded-3xl border p-7 sm:p-9">
  <div className="kh-kicker">Illustration only · No membership or job is active</div>
  <h3 className="mt-2 text-2xl font-extrabold">See the costs before you decide.</h3>
  <p className="mt-2 text-sm opacity-75">Example amounts for a future eligible service—not a quote, booking, coverage promise or provider payout. The published standard price may include travel; eligibility applies only to the confirmed labor amount.</p>
  <div className="mt-7 grid gap-4 sm:grid-cols-3">
   <label className="text-sm font-semibold">Eligible labor ($)
    <input className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950" min={0} max={1000} step={1} type="number" value={labor} onChange={e=>setLabor(Math.min(1000,Math.max(0,Number(e.target.value)||0)))}/>
   </label>
   <label className="text-sm font-semibold">Materials ($)
    <input className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950" min={0} max={1000} step={1} type="number" value={materials} onChange={e=>setMaterials(Math.min(1000,Math.max(0,Number(e.target.value)||0)))}/>
   </label>
   <label className="text-sm font-semibold">Benefit used earlier this year ($)
    <input className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950" min={0} max={100} step={1} type="number" value={used} onChange={e=>setUsed(Math.min(100,Math.max(0,Number(e.target.value)||0)))}/>
   </label>
  </div>
  <dl className="mt-7 space-y-3 rounded-2xl bg-lime-100 p-6 text-slate-950">
   <div className="flex justify-between gap-3"><dt>Eligible labor</dt><dd className="font-bold">{money(q.laborCents)}</dd></div>
   <div className="flex justify-between gap-3"><dt>Materials (customer)</dt><dd className="font-bold">{money(q.materialsCents)}</dd></div>
   <div className="flex justify-between gap-3"><dt>TLNM labor contribution</dt><dd className="font-bold">−{money(q.tlnmContributionCents)}</dd></div>
   <div className="flex justify-between gap-3 border-t border-slate-300 pt-3 text-lg"><dt className="font-extrabold">You would pay</dt><dd className="font-extrabold">{money(q.customerOwesCents)}</dd></div>
   <div className="flex justify-between gap-3 text-sm"><dt>Benefit remaining afterward</dt><dd>{money(q.remainingBenefitCents)}</dd></div>
  </dl>
  <p className="mt-4 text-xs opacity-65">TLNM's customer benefit is not the locksmith's contracted job payout. Providers separately receive the agreed travel-and-labor payout according to their provider agreement.</p>
 </div>;
}
