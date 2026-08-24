import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { addManagedProperty, createPmServiceRequest, createPropertyManagerOrganization } from "./actions";

export default async function PropertyManagerWorkspace({ searchParams }: { searchParams: Promise<{ notice?: string; error?: string }> }) {
  const { notice, error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/property-manager");

  const { data: membership } = await supabase
    .from("pm_members")
    .select("organization_id,role,organization:pm_organizations(*)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  const org = membership?.organization as any;
  const organizationId = membership?.organization_id;
  const [{ data: properties }, { data: requests }] = organizationId
    ? await Promise.all([
        supabase.from("pm_properties").select("*").eq("organization_id", organizationId).order("name"),
        supabase.from("pm_service_requests").select("*,property:pm_properties(name,address)").eq("organization_id", organizationId).order("created_at", { ascending: false }).limit(50),
      ])
    : [{ data: [] as any[] }, { data: [] as any[] }];

  const propertyList = properties ?? [];
  const requestList = requests ?? [];
  const unitCount = propertyList.reduce((sum: number, property: any) => sum + Number(property.unit_count ?? 0), 0);
  const openRequestCount = requestList.filter((request: any) => !["completed", "cancelled"].includes(request.status)).length;
  const completedRequestCount = requestList.filter((request: any) => request.status === "completed").length;

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="eyebrow">Property portfolio</div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl text-parchment">One locksmith workflow across your properties</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-parchment-dim">Request resident lockout, turnover rekey and access work through Trusted Locksmith. Independent local providers perform the field service while your workspace keeps the property and request history together.</p>

          {notice && <div className="mt-5 rounded-xl border border-verdigris/30 bg-verdigris/10 p-3 text-sm text-verdigris">{notice}</div>}
          {error && <div className="mt-5 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

          {!organizationId ? (
            <form action={createPropertyManagerOrganization} className="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-display text-2xl text-parchment">Create your portfolio workspace</h2>
              <p className="mt-2 text-sm leading-6 text-parchment-dim">Start with the organization name. Properties and requests are added after the workspace is created.</p>
              <input name="organization_name" required placeholder="Company / management organization" className="mt-4 w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
              <button className="mt-3 rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Create workspace</button>
            </form>
          ) : (
            <>
              <div className="mt-7 flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wide text-parchment-dim">Organization</div>
                  <div className="mt-2 font-display text-2xl text-parchment">{org?.name}</div>
                </div>
                <div className="text-xs leading-5 text-parchment-dim">Property records and service history stay inside this workspace.</div>
              </div>

              <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Portfolio summary">
                <Metric label="Properties" value={propertyList.length} detail={`${unitCount} total units`} />
                <Metric label="Open requests" value={openRequestCount} detail="Requested or in matching" />
                <Metric label="Completed" value={completedRequestCount} detail="In recent service history" />
                <Metric label="Workflow" value="1" detail="Consistent intake across properties" />
              </section>

              <div className="mt-7 grid gap-6 lg:grid-cols-2">
                <form action={addManagedProperty} className="rounded-2xl border border-line bg-surface p-6">
                  <input type="hidden" name="organization_id" value={organizationId} />
                  <h2 className="font-display text-2xl text-parchment">Add property</h2>
                  <p className="mt-2 text-xs leading-5 text-parchment-dim">Keep the address and unit count attached to future service requests.</p>
                  <div className="mt-4 space-y-3">
                    <input name="name" required placeholder="Property / building name" className="w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                    <input name="address" required placeholder="Street address" className="w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                    <input name="unit_count" type="number" min="1" defaultValue="1" className="w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" aria-label="Number of units" />
                    <button className="w-full rounded-full border border-brass/40 px-5 py-2.5 text-sm font-semibold text-brass">Add property</button>
                  </div>
                </form>

                <form action={createPmServiceRequest} className="rounded-2xl border border-line bg-surface p-6">
                  <input type="hidden" name="organization_id" value={organizationId} />
                  <h2 className="font-display text-2xl text-parchment">Create locksmith request</h2>
                  <p className="mt-2 text-xs leading-5 text-parchment-dim">The request stays attached to the property from intake through completion.</p>
                  <div className="mt-4 space-y-3">
                    <select name="property_id" required className="w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment">
                      <option value="">Choose property</option>
                      {propertyList.map((property: any) => <option key={property.id} value={property.id}>{property.name} · {property.address}</option>)}
                    </select>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input name="unit_label" placeholder="Unit (optional)" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                      <select name="service_type" defaultValue="lockout" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment">
                        <option value="lockout">Resident lockout</option>
                        <option value="rekey">Turnover rekey</option>
                        <option value="lock_change">Lock change</option>
                        <option value="smart_lock">Smart lock</option>
                      </select>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input name="resident_name" placeholder="Resident / contact" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                      <input name="resident_phone" placeholder="Phone" className="rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                    </div>
                    <textarea name="notes" rows={2} placeholder="Access notes / service details" className="w-full rounded-xl border border-line bg-surface-raised px-3 py-2.5 text-sm text-parchment" />
                    <button className="w-full rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-ink">Submit request</button>
                  </div>
                </form>
              </div>

              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-parchment">Recent requests</h2>
                  <span className="font-mono text-xs text-parchment-dim">{requestList.length}</span>
                </div>
                <div className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
                  {requestList.length === 0 ? (
                    <div className="p-5 text-sm text-parchment-dim">No requests yet.</div>
                  ) : requestList.map((request: any) => (
                    <div key={request.id} className="grid gap-2 p-5 sm:grid-cols-[1fr_auto]">
                      <div>
                        <div className="text-sm font-medium text-parchment">{friendlyService(request.service_type)} · {request.property?.name}{request.unit_label ? ` · ${request.unit_label}` : ""}</div>
                        <div className="mt-1 text-xs text-parchment-dim">{request.property?.address}</div>
                      </div>
                      <span className="font-mono text-[10px] uppercase text-parchment-dim">{friendlyStatus(request.status)}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          <Link href="/for-property-managers" className="mt-8 inline-flex text-sm text-brass">← Property-manager overview</Link>
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

function friendlyService(service?: string | null) {
  const labels: Record<string, string> = { lockout: "Resident lockout", rekey: "Turnover rekey", lock_change: "Lock change", smart_lock: "Smart lock" };
  return labels[service ?? ""] ?? String(service ?? "").replaceAll("_", " ");
}

function friendlyStatus(status?: string | null) {
  const labels: Record<string, string> = { requested: "Requested", offered: "Matching provider", accepted: "Provider accepted", completed: "Completed", cancelled: "Cancelled" };
  return labels[status ?? ""] ?? String(status ?? "").replaceAll("_", " ");
}
