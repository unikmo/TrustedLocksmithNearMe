import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { defaultServiceForJobType, formatServicePrice, getServiceMenuItem } from "@/lib/service-menu";
import { offerJob, reviewProviderClaim } from "./actions";

export const metadata: Metadata = { title: "Trusted Locksmith network operations", robots: { index: false } };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/");

  const [
    { data: providers },
    { data: sources },
    { data: claims },
    { data: guestBookings },
    { data: memberRequests },
    { data: offers },
  ] = await Promise.all([
    supabase.from("provider_profiles").select("*").order("business_name"),
    supabase.from("provider_sources").select("*"),
    supabase.from("provider_claims").select("*").order("submitted_at", { ascending: false }),
    supabase.from("guest_bookings").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("dispatch_requests").select("*").order("created_at", { ascending: false }).limit(50),
    supabase.from("provider_job_offers").select("*").order("offered_at", { ascending: false }).limit(100),
  ]);

  const sourceMap = new Map((sources ?? []).map((source: any) => [source.provider_id, source]));
  const verifiedProviders = (providers ?? []).filter((provider: any) => provider.claim_status === "verified");
  const dispatchableProviders = verifiedProviders.filter((provider: any) => provider.is_available && provider.stripe_payouts_enabled);
  const pendingClaims = (claims ?? []).filter((claim: any) => claim.status === "pending");
  const openGuest = (guestBookings ?? []).filter((request: any) => request.status !== "completed");
  const openMember = (memberRequests ?? []).filter((request: any) => !["completed", "cancelled"].includes(request.status));
  const acceptedOffers = (offers ?? []).filter((offer: any) => offer.status === "accepted");

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Internal operations</div>
              <h1 className="mt-2 font-display text-4xl text-parchment">Trusted Locksmith network dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-parchment-dim">Provider claims, supply readiness, service requests, private commercial offers and accepted jobs.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/admin/providers" className="font-semibold text-brass">Provider acquisition →</Link>
              <Link href="/admin/v4" className="font-semibold text-brass">Audit & B2B operations →</Link>
            </div>
          </div>

          {notice && <div className="mt-6 rounded-xl border border-verdigris/30 bg-verdigris/10 p-3 text-sm text-verdigris">{notice}</div>}
          {error && <div className="mt-6 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <Stat label="Providers loaded" value={String((providers ?? []).length)} />
            <Stat label="Unclaimed" value={String((providers ?? []).filter((p: any) => p.claim_status === "unclaimed").length)} />
            <Stat label="Pending exceptions" value={String(pendingClaims.length)} />
            <Stat label="Claimed" value={String(verifiedProviders.length)} />
            <Stat label="Dispatchable" value={String(dispatchableProviders.length)} />
            <Stat label="Accepted jobs" value={String(acceptedOffers.length)} />
          </div>

          <section className="mt-10">
            <SectionTitle title="Exception-review provider claims" count={pendingClaims.length} />
            <p className="mt-2 max-w-3xl text-xs leading-5 text-parchment-dim">The normal verified-email invitation path auto-links the business. Claims appear here only when they cannot be verified through that path.</p>
            <div className="mt-3 space-y-3">
              {pendingClaims.length === 0 ? <Empty>No provider claims require manual exception review.</Empty> : pendingClaims.map((claim: any) => {
                const provider = (providers ?? []).find((p: any) => p.id === claim.provider_id);
                return (
                  <div key={claim.id} className="rounded-2xl border border-line bg-surface p-5">
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <div className="font-medium text-parchment">{provider?.business_name ?? "Unknown provider"}</div>
                        <div className="mt-1 text-xs text-parchment-dim">{claim.contact_name} · {claim.business_email} · {claim.business_phone} · {claim.relationship}</div>
                        {claim.notes ? <div className="mt-2 text-xs leading-5 text-parchment-dim">{claim.notes}</div> : null}
                      </div>
                      <div className="flex gap-2">
                        <form action={reviewProviderClaim}><input type="hidden" name="claim_id" value={claim.id} /><input type="hidden" name="decision" value="approve" /><button className="rounded-full bg-brass px-4 py-2 text-xs font-semibold text-ink">Approve exception</button></form>
                        <form action={reviewProviderClaim}><input type="hidden" name="claim_id" value={claim.id} /><input type="hidden" name="decision" value="reject" /><button className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-parchment">Reject</button></form>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <SectionTitle title="Open one-off requests" count={openGuest.length} />
            <div className="mt-3 space-y-3">
              {openGuest.length === 0 ? <Empty>No open one-off requests.</Empty> : openGuest.map((request: any) => {
                const service = getServiceMenuItem(request.service_id) ?? defaultServiceForJobType(request.job_type)!;
                const existing = (offers ?? []).filter((offer: any) => offer.request_type === "guest_booking" && offer.request_id === request.id);
                return (
                  <div key={request.id} className="rounded-2xl border border-line bg-surface p-5">
                    <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                      <div>
                        <div className="font-medium text-parchment">{service.title} · {formatServicePrice(request.price_cents || service.customerPriceCents)}</div>
                        <div className="mt-1 text-xs text-parchment-dim">{request.address} · {request.id.slice(0,8).toUpperCase()}{request.priority_requested ? " · HOUSEHOLD+ PRIORITY" : ""}</div>
                        <div className="mt-2 text-xs text-parchment-dim">{existing.length} provider offer(s) · {existing.filter((o:any)=>o.status==="accepted").length} accepted</div>
                      </div>
                      <OfferForm requestType="guest_booking" requestId={request.id} providers={dispatchableProviders} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <SectionTitle title="Legacy member requests" count={openMember.length} />
            <div className="mt-3 space-y-3">
              {openMember.length === 0 ? <Empty>No legacy member requests.</Empty> : openMember.map((request: any) => {
                const existing = (offers ?? []).filter((offer: any) => offer.request_type === "member_dispatch" && offer.request_id === request.id);
                return (
                  <div key={request.id} className="rounded-2xl border border-line bg-surface p-5">
                    <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                      <div><div className="font-medium text-parchment">{request.issue ?? "Member access request"}</div><div className="mt-1 text-xs text-parchment-dim">{request.id.slice(0,8).toUpperCase()} · {existing.length} provider offer(s) · {existing.filter((o:any)=>o.status==="accepted").length} accepted</div></div>
                      <OfferForm requestType="member_dispatch" requestId={request.id} providers={dispatchableProviders} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10">
            <SectionTitle title="Provider network" count={(providers ?? []).length} />
            <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-surface"><div className="divide-y divide-line">{(providers ?? []).map((provider: any) => { const source: any = sourceMap.get(provider.id); return <div key={provider.id} className="grid gap-2 px-5 py-4 md:grid-cols-[1.4fr_.7fr_.7fr_.7fr_1fr] md:items-center"><div><div className="text-sm font-medium text-parchment">{provider.business_name}</div><div className="mt-1 text-xs text-parchment-dim">{[provider.city, provider.state].filter(Boolean).join(", ") || "Greater Boston"}</div></div><div className="font-mono text-[10px] uppercase tracking-wide text-parchment-dim">{provider.claim_status}</div><div className={`font-mono text-[10px] uppercase tracking-wide ${provider.stripe_payouts_enabled ? "text-verdigris" : "text-parchment-dim"}`}>{provider.stripe_payouts_enabled ? "payout-ready" : "payout pending"}</div><div className={`font-mono text-[10px] uppercase tracking-wide ${provider.is_available && provider.stripe_payouts_enabled ? "text-verdigris" : "text-parchment-dim"}`}>{provider.is_available && provider.stripe_payouts_enabled ? "available" : "offline"}</div><div className="text-xs text-parchment-dim">{source?.phone ?? "No source phone"}</div></div>; })}</div></div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function OfferForm({requestType,requestId,providers}:{requestType:string;requestId:string;providers:any[]}) { return <form action={offerJob} className="grid gap-2 sm:grid-cols-[1fr_120px_auto]"><input type="hidden" name="request_type" value={requestType} /><input type="hidden" name="request_id" value={requestId} /><select name="provider_id" required className="rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-parchment"><option value="">Choose payout-ready available provider</option>{providers.map((provider:any)=><option key={provider.id} value={provider.id}>{provider.business_name}</option>)}</select><input name="payout_cents" type="number" min={100} required placeholder="Payout cents" className="rounded-xl border border-line bg-surface-raised px-3 py-2 text-sm text-parchment" aria-label="Payout cents" /><button className="rounded-full bg-brass px-4 py-2 text-xs font-semibold text-ink">Send offer</button></form>; }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-line bg-surface p-4"><div className="font-mono text-[9px] uppercase tracking-[.12em] text-parchment-dim">{label}</div><div className="mt-2 font-display text-3xl text-parchment">{value}</div></div>; }
function SectionTitle({ title, count }: { title: string; count: number }) { return <div className="flex items-center justify-between"><h2 className="font-display text-2xl text-parchment">{title}</h2><span className="font-mono text-xs text-parchment-dim">{count}</span></div>; }
function Empty({ children }: { children: React.ReactNode }) { return <div className="rounded-2xl border border-line bg-surface p-5 text-sm text-parchment-dim">{children}</div>; }
