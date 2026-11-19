"use client";
import { useMemo, useState } from "react";

const FIRST = ["Housemate / partner", "Trusted family member", "Building manager / reception", "Trusted neighbor", "Property contact"] as const;
const BACKUP = ["Trusted neighbor", "Trusted family member", "Building manager / reception", "Housemate / partner", "Property contact"] as const;
const HELP = ["TLNM digital concierge", "Verified local locksmith", "Building manager", "Local property support"] as const;
const PLAN_LINK = "https://trustedlocksmithnearme.com/keys-happen";

export function KeysHappenPlanner() {
  const [first, setFirst] = useState<string>(FIRST[0]);
  const [backup, setBackup] = useState<string>(BACKUP[0]);
  const [help, setHelp] = useState<string>(HELP[0]);
  const [shared, setShared] = useState(false);
  const [message, setMessage] = useState("");
  // The card is generated only from fixed, non-sensitive choice lists.
  // Users cannot type access codes, key locations or private notes.
  const card = useMemo(() => [
    "KEYS HAPPEN · HOUSEHOLD BACKUP PLAN",
    "FIRST CALL: " + first,
    "BACKUP: " + backup,
    "HELP: " + help,
    "Ask the selected people if they agree to be your contacts.",
    "Check lawful entry options and confirm any locksmith quote first.",
    "No access codes or spare-key locations belong on this card.",
    "Make a free plan: " + PLAN_LINK
  ].join("\n"), [first, backup, help]);

  async function sharePlan() {
    setMessage("");
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "Keys Happen backup plan", text: card });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(card);
      } else {
        throw new Error("Clipboard sharing is unavailable");
      }
      setShared(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setMessage("Sharing is unavailable on this device. You can select and copy the plan preview below.");
    }
  }

  return <section className="kh-card mx-auto max-w-5xl rounded-3xl border p-6 sm:p-10" id="make-plan" aria-labelledby="make-plan-heading">
    <div className="kh-kicker">Free · No login · No access secrets</div>
    <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" id="make-plan-heading">Make your household plan.</h2>
    <p className="mt-3 max-w-2xl text-sm opacity-75">Choose who you would contact. Tell those people about the plan separately. The card intentionally records roles—not names, phone numbers, door codes or locations.</p>
    <div className="mt-7 grid gap-4 sm:grid-cols-3">
      <label className="block text-sm font-semibold">1. First call
        <select value={first} onChange={e=>setFirst(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900">
          {FIRST.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold">2. Fallback
        <select value={backup} onChange={e=>setBackup(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900">
          {BACKUP.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold">3. Where to find help
        <select value={help} onChange={e=>setHelp(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900">
          {HELP.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    </div>
    <div className="kh-plan-card mt-6 rounded-2xl bg-lime-100 p-5 text-sm text-slate-950">
      <strong>Your shareable backup plan</strong>
      <pre className="mt-3 select-text whitespace-pre-wrap font-sans leading-7">{card}</pre>
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      <button type="button" onClick={sharePlan} className="kh-primary rounded-full px-6 py-3 font-bold">Share / copy my plan →</button>
      <button type="button" onClick={()=>window.print()} className="rounded-full border border-slate-400 px-6 py-3 font-semibold">Save card as PDF / print</button>
    </div>
    {shared && <p role="status" className="mt-3 text-sm">Your backup plan was shared or copied. Confirm the people on it are happy to help.</p>}
    {message && <p role="alert" className="mt-3 text-sm text-red-700">{message}</p>}
    <p className="mt-4 text-xs opacity-70">Privacy by design: no free-text fields, no account and no server submission. Your card contains no door code, spare-key address or household access secret.</p>
  </section>;
}
