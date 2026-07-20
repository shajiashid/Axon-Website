/**
 * Vercel serverless function — receives an enrollment-form submission and
 * emails it to the relevant inboxes via Resend. The Resend API key stays on
 * the server (env var) and is never exposed to the browser.
 *
 * ── SETUP ─────────────────────────────────────────────────────────────
 * 1. Verify your domain in Resend (the link you opened) so you can send
 *    "from" an @axoncareers.co.nz address.
 * 2. Resend ▸ API Keys ▸ Create API Key. Copy it (starts with re_...).
 * 3. Deploy this repo to Vercel (vercel.com ▸ Add New ▸ Project ▸ import
 *    the Axon-Website GitHub repo). Vercel auto-detects Vite.
 * 4. Vercel ▸ Project ▸ Settings ▸ Environment Variables, add:
 *      RESEND_API_KEY = re_your_key_here
 *      RESEND_FROM    = Axon Careers <forms@axoncareers.co.nz>   (optional)
 *    Then Redeploy.
 * ──────────────────────────────────────────────────────────────────────
 */

// Server-side recipient map (kept here, not sent from the browser, so no one
// can redirect submissions elsewhere).
const RECIPIENTS = {
  ahpra: ['ahpraapplication@gmail.com', 'info@axoncareers.co.nz'],
  osce: ['osceapplication@gmail.com', 'info@axoncareers.co.nz'],
  iqn: ['iqnapplication@gmail.com', 'info@axoncareers.co.nz'],
}

const FROM = process.env.RESEND_FROM || 'Axon Careers <forms@axoncareers.co.nz>'

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(500).json({ error: 'RESEND_API_KEY is not set' })

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const { form, type, submittedAt, data } = body

    const to = RECIPIENTS[type]
    if (!to) return res.status(400).json({ error: `Unknown form type: ${type}` })

    const rows = Object.entries(data || {})
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f8fafc;white-space:nowrap">${esc(
            k,
          )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${esc(v) || '—'}</td></tr>`,
      )
      .join('')

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:660px;margin:0 auto">
        <h2 style="color:#1023cf;margin:0 0 4px">${esc(form)}</h2>
        <p style="color:#6b7280;margin:0 0 18px">New submission · ${esc(submittedAt)}</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
      </div>`

    const applicant =
      (data && (data['Full name'] || data['First name'])) || ''
    const subject = `${form}${applicant ? ` — ${applicant}` : ''}`
    const replyTo = data && data['Email']

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text()
      return res.status(502).json({ error: 'Resend rejected the email', detail })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
