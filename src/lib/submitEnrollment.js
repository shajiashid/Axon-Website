// Sends an enrollment-form submission to the Next.js API route
// (src/app/api/enroll/route.js), which emails it to the right inboxes via
// Resend. Same-origin request, so we can read the response and know if it
// truly sent. Throws on any failure so the caller can handle it.
export const ENROLL_ENDPOINT = '/api/enroll'

export async function submitEnrollment(payload) {
  const res = await fetch(ENROLL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json().catch(() => null)
  if (!res.ok || !json || json.ok !== true) {
    throw new Error(json?.error || `Submit failed (${res.status})`)
  }
  return json
}
