import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { formatUsd } from "@/lib/plans";
import { createBrokerageAccount, createBulkMembershipOrder } from "./actions";

export default async function BrokeragePage({ searchParams }: { searchParams: Promise<{ notice?: string; error?: string }> }) {
  const { notice, error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/brokerage");

  const { data: membership } = await supabase
    .from("brokerage_members")
    .select("brokerage_id,role,brokerage:brokerage_accounts(*)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  const brokerage = membership?.brokerage as any;
  const brokerageId = membership?.brokerage_id;
  const [{ data: orders }, { data: codes }, { data: plans }] = brokerageId
    ? await Promise.all([
        supabase.from("brokerage_bulk_orders").select("*").eq("brokerage_id", brokerageId).order("created_at", { ascending: false }),
        supabase.from("brokerage_activation_codes").select("*").eq("brokerage_id", brokerageId).order("created_at", { ascending: false }).limit(200),
        supabase.from("plans").select("id,name,price_cents").order("sort_order"),
      ])
    : [{ data: [] as any[] }, { data: [] as any[] }, await supabase.from("plans").select("id,name,price_cents").order("sort_order")];

  const orderList = orders ?? [];
  const codeList = codes ?? [];
  const readyCodes = codeList.filter((code: any) => code.status === "unused").length;
  const activatedCodes = codeList.filter((code: any) => code.status === "activated").length;
  const confirmedOrders = orderList.filter((order: any) => ["paid", "codes_issued"].includes(order.status)).length;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="eyebrow">Brokerage workspace</div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl text-parchment">Trusted Locksmith memberships for homebuyer closings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Prepare memberships in batches, assign activation codes to buyers and let each buyer own their Trusted Locksmith account. Gifted memberships do not automatically renew on the brokerage payment method.</p>

          {notice && <div className="mt-5 rounded-xl border border-verdigris/30 bg-verdigris/10 p-3 text-sm text-verdigris">{notice}</div>}
          {error && <div className="mt-5 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

          {!brokerageId ? (
            <form action={createBrokerageAccount} className="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-display text-2xl text-parchment">Create brokerage workspace</h2>
              <p className="mt-2 text-sm leading-6 text-parchment-dim">Set up the team workspace first. Membership orders and buyer activation codes live here afterward.</p>
              <input name="brokerage_name" required placeholder="Brokerage / team name" className="mt-4 w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
              <button className="mt-3 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Create workspace</button>
            </form>
          ) : (
            <>
              <div className="mt-7 flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-parchment-dim">Brokerage</div>
                  <div className="mt-2 font-display text-2xl text-parchment">{brokerage?.name}</div>
                </div>
                <div className="text-xs leading-5 text-parchment-dim">The buyer activates and controls the final account.</div>
              </div>

              <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Brokerage gifting summary">
                <Metric label="Orders" value={orderList.length} detail={`${confirmedOrders} confirmed`} />
                <Metric label="Ready codes" value={readyCodes} detail="Available for upcoming closings" />
                <Metric label="Activated" value={activatedCodes} detail="Buyer accounts activated" />
                <Metric label="Buyer ownership" value="100%" detail="Recipient controls the account" />
              </section>

              <form action={createBulkMembershipOrder} className="mt-7 rounded-2xl border border-line bg-surface p-6">
                <input type="hidden" name="brokerage_id" value={brokerageId} />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl text-parchment">Create membership order</h2>
                    <p className="mt-2 text-xs leading-5 text-parchment-dim">Choose a plan and batch size. Activation codes are issued after the order is confirmed.</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">Repeatable closing workflow</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <select name="plan_id" defaultValue="household" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment">
                    {(plans ?? []).map((plan: any) => <option key={plan.id} value={plan.id}>{plan.name} · {formatUsd(plan.price_cents)}/yr</option>)}
                  </select>
                  <select name="quantity" defaultValue="25" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment">
                    <option value="10">10 memberships</option>
                    <option value="25">25 memberships</option>
                    <option value="50">50 memberships</option>
                    <option value="100">100 memberships</option>
                  </select>
                  <button className="rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Create order</button>
                </div>
              </form>

              <section className="mt-8">
                <h2 className="font-display text-2xl text-parchment">Orders</h2>
                <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
                  {orderList.length === 0 ? (
                    <div className="p-5 text-sm text-parchment-dim">No orders yet.</div>
                  ) : orderList.map((order: any) => (
                    <div key={order.id} className="grid gap-2 p-5 sm:grid-cols-[1fr_auto]">
                      <div>
                        <div className="text-sm font-medium text-parchment">{order.quantity} × {order.plan_id} · {formatUsd(order.total_price_cents)}</div>
                        <div className="mt-1 text-xs text-parchment-dim">{order.discount_pct > 0 ? `${order.discount_pct}% partner discount · ` : ""}{formatUsd(order.unit_price_cents)} each</div>
                      </div>
                      <span className="font-mono text-[10px] uppercase text-parchment-dim">{friendlyStatus(order.status)}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-parchment">Activation codes</h2>
                  <span className="font-mono text-xs text-parchment-dim">{codeList.length}</span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {codeList.length === 0 ? (
                    <div className="rounded-xl border border-line bg-surface p-5 text-sm text-parchment-dim">Activation codes appear after an order is confirmed.</div>
                  ) : codeList.map((code: any) => (
                    <div key={code.id} className="rounded-xl border border-line bg-surface p-4 shadow-[0_10px_24px_rgba(3,18,37,0.1)]">
                      <div className="font-mono text-sm text-brass">{code.code}</div>
                      <div className="mt-1 text-[10px] uppercase text-parchment-dim">{friendlyStatus(code.status)}</div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <Link href="/for-real-estate-agents" className="mt-8 inline-flex text-sm text-brass">← Real-estate partnership overview</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-2xl border border-sky/15 bg-surface/70 p-5 shadow-[0_14px_32px_rgba(3,18,37,0.14)]">
      <div className="font-mono text-[10px] uppercase tracking-[.14em] text-parchment-dim">{label}</div>
      <div className="mt-2 font-display text-3xl text-brass">{value}</div>
      <div className="mt-1 text-xs leading-5 text-parchment-dim">{detail}</div>
    </div>
  );
}

function friendlyStatus(status?: string | null) {
  const labels: Record<string, string> = {
    pending_invoice: "Awaiting confirmation",
    paid: "Confirmed",
    codes_issued: "Codes issued",
    unused: "Ready to use",
    activated: "Activated",
  };
  return labels[status ?? ""] ?? String(status ?? "").replaceAll("_", " ");
}
