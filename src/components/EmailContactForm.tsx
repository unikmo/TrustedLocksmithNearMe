'use client'

import { FormEvent, useState } from 'react'

const topics = ['General question', 'Turnover rekey', 'Specialist assessment', 'Business account support', 'Billing', 'Provider', 'Trust & safety', 'Privacy request', 'Legal question']

export function EmailContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(typeof result.error === 'string' ? result.error : '')
      form.reset()
      setStatus('sent')
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'Your message could not be sent. Please try again or email hello@trustedlocksmithnearme.com.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-5 rounded-xl border border-verdigris/30 bg-verdigris/10 px-4 py-4 text-sm text-verdigris" role="status" aria-live="polite">
        <h3 className="font-semibold">Thank you. Your message is with us.</h3>
        <p className="mt-2 leading-6">
          We will reply by email, usually within two working days. If you do not hear from us, check your spam folder or write to{' '}
          <a className="underline" href="mailto:hello@trustedlocksmithnearme.com">hello@trustedlocksmithnearme.com</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit} noValidate={false}>
      <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-parchment-dim">Name</span>
        <input name="name" required maxLength={100} autoComplete="name" className="field" />
      </label>
      <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-parchment-dim">Email</span>
        <input name="email" type="email" required maxLength={254} autoComplete="email" className="field" />
      </label>
      <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-parchment-dim">Topic</span>
        <select name="topic" className="field">
          {topics.map(t => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-parchment-dim">Message</span>
        <textarea name="message" required minLength={2} maxLength={5000} rows={6} className="field" />
      </label>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <p className="text-xs leading-5 text-parchment-dim">We use these details only to answer your message.</p>
      {status === 'error' && <p role="alert" className="text-sm font-bold text-ember">{error}</p>}
      <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-11 items-center justify-center rounded-full bg-brass px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-60">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
