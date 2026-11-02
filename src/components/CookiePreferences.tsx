export function CookiePreferences() {
  return <section className="rounded-2xl border border-line bg-surface p-6" aria-label="Cookie status">
    <h2 className="font-display text-xl text-parchment">Essential cookies</h2>
    <p className="mt-3 leading-7 text-parchment-dim">Sign-in cookies support authentication and session security. You can remove them in your browser; doing so signs you out.</p>
    <h2 className="mt-6 font-display text-xl text-parchment">Optional analytics</h2>
    <p className="mt-3 leading-7 text-parchment-dim">No optional analytics cookie integration is enabled in this application.</p>
  </section>;
}
