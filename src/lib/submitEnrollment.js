// Sends an enrollment-form submission to the serverless function
// (api/enroll.js), which emails it to the right inboxes via Resend.
//
// Same-origin request, so we can read the response and know if it truly sent.
// Throws on any failure so the caller can fall back to the mailto flow
// (e.g. during local `vite dev`, where /api isn't served).
export const ENROLL_ENDPOINT = '/api/enroll'

export async function submitEnrollment(payload) {
  const res = await fetch(ENROLL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.json()).error || ''
    } catch {
      /* ignore */
    }
    throw new Error(`Submit failed (${res.status}) ${detail}`)
  }
  return res.json().catch(() => ({ ok: true }))
}
