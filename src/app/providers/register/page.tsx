import type { Metadata } from "next";
import Link from "next/link";
import { Keyhole } from "@/components/Keyhole";
import { registerProvider } from "./actions";

export const metadata: Metadata = { title: "Create provider account", robots: { index: false } };

export default async function ProviderRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; invite?: string; email?: string; error?: string }>;
}) {
  const { provider, invite, email, error } = await searchParams;
  const nextParams = new URLSearchParams();
  if (provider) nextParams.set("provider", provider);
  if (invite) nextParams.set("invite", invite);
  const next = `/providers/claim${nextParams.size ? `?${nextParams.toString()}` : ""}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-7 sm:p-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-lg text-parchment"><Keyhole className="h-5 w-4 text-brass" />Trusted Locksmith</Link>
          <div className="mt-7 eyebrow">Provider account</div>
          <h1 className="mt-2 font-display text-3xl text-parchment">Set up your provider account</h1>
          <p className="mt-2 text-sm leading-6 text-parchment-dim">Use the business email that received the invitation. After the profile is claimed, Stripe securely collects payout and identity information.</p>
        </div>

        {error && <div className="mt-5 rounded-xl border border-ember/30 bg-ember/10 p-3 text-sm text-ember">{error}</div>}

        <form action={registerProvider} className="mt-6 space-y-4">
          <input type="hidden" name="provider" value={provider ?? ""} />
          <input type="hidden" name="invite" value={invite ?? ""} />
          <Field label="Your name"><input className="input" name="name" required autoComplete="name" /></Field>
          <Field label="Business email"><input className="input" type="email" name="email" required autoComplete="email" defaultValue={email ?? ""} /></Field>
          <Field label="Password"><input className="input" type="password" name="password" required minLength={8} autoComplete="new-password" /></Field>
          <button className="w-full rounded-full bg-brass px-5 py-3 text-sm font-semibold text-ink">Create account & continue</button>
        </form>

        <p className="mt-4 text-center text-[11px] leading-5 text-parchment-dim">An invited claim is automatically linked only when the signed-in account email matches the verified business email that received the invitation. Other claims use the exception-review path.</p>
        <p className="mt-5 text-center text-xs text-parchment-dim">Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-brass hover:underline">Log in</Link></p>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--line);background:var(--surface-raised);border-radius:.75rem;padding:.75rem .9rem;font-size:.875rem;color:var(--parchment);outline:none}.input:focus{border-color:var(--brass)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.12em] text-parchment-dim">{label}</span>{children}</label>;
}
