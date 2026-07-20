// Sends an enrollment-form submission to the PHP endpoint (public/enroll.php),
// which emails it to the right inboxes via Resend.
//
// Same-origin request, so we can read the response and know if it truly sent.
// Throws on any failure — a non-2xx status, a non-JSON body, or ok !== true —
// so the caller can fall back to the mailto flow (e.g. during local `vite dev`,
// where the .php is served as a static file rather than executed).
export const ENROLL_ENDPOINT = '/enroll.php'

export async function submitEnrollment(payload) {
  const res = await fetch(ENROLL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Unexpected response (${res.status})`)
  }
  if (!res.ok || !json || json.ok !== true) {
    throw new Error(json?.error || `Submit failed (${res.status})`)
  }
  return json
}
