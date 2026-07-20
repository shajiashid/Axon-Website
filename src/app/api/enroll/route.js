import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// All enrollment forms notify these inboxes.
const RECIPIENTS = ['osceapplication@gmail.com', 'info@axoncareers.co.nz']
const FROM = process.env.RESEND_FROM || 'Axon Careers <forms@axoncareers.co.nz>'

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Axon Careers enrollment endpoint is live.' })
}

export async function POST(request) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    return NextResponse.json(
      { ok: false, error: 'RESEND_API_KEY is not set' },
      { status: 500 },
    )
  }

  try {
    const body = await request.json()
    const { form = 'Enrollment form', submittedAt = '', data = {}, attachments } =
      body || {}

    // Decode any uploaded files into Resend attachments.
    const emailAttachments = Array.isArray(attachments)
      ? attachments
          .filter((a) => a && a.filename && a.content)
          .map((a) => ({ filename: a.filename, content: Buffer.from(a.content, 'base64') }))
      : []

    const rows = Object.entries(data)
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

    const applicant = data['Full name'] || data['First name'] || ''
    const subject = `${form}${applicant ? ` — ${applicant}` : ''}`

    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      subject,
      html,
      ...(data['Email'] ? { replyTo: data['Email'] } : {}),
      ...(emailAttachments.length ? { attachments: emailAttachments } : {}),
    })

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message || 'Resend rejected the email' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
