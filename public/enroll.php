<?php
/**
 * Axon Careers — enrollment form receiver (Hostinger / PHP).
 *
 * Emails each enrollment-form submission to the inboxes below via Resend.
 * Lives at  https://your-domain/enroll.php  (Vite copies /public into the build).
 *
 * ── SETUP ─────────────────────────────────────────────────────────────
 * 1. Verify axoncareers.co.nz in Resend and create an API key (re_...).
 * 2. In Hostinger's File Manager, inside public_html (next to this file),
 *    create a file named  resend-config.php  containing exactly:
 *
 *        <?php return 're_your_real_key_here';
 *
 *    (That file holds your secret key. It is git-ignored and never shipped
 *     in the build, so the key stays only on your server.)
 * ──────────────────────────────────────────────────────────────────────
 */

header('Content-Type: application/json; charset=utf-8');

// Emails go to these inboxes.
$RECIPIENTS = array('osceapplication@gmail.com', 'info@axoncareers.co.nz');
$FROM = getenv('RESEND_FROM');
if (!$FROM) {
  $FROM = 'Axon Careers <forms@axoncareers.co.nz>';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(array('error' => 'Method not allowed'));
  exit;
}

// Load the API key: prefer an env var, else the private config file.
$apiKey = getenv('RESEND_API_KEY');
$configPath = __DIR__ . '/resend-config.php';
if (!$apiKey && is_readable($configPath)) {
  $apiKey = require $configPath;
}
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(array('error' => 'RESEND_API_KEY is not configured on the server'));
  exit;
}

// Parse the JSON body sent by the form.
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) {
  http_response_code(400);
  echo json_encode(array('error' => 'Invalid JSON body'));
  exit;
}

$form = isset($body['form']) ? (string) $body['form'] : 'Enrollment form';
$submittedAt = isset($body['submittedAt']) ? (string) $body['submittedAt'] : '';
$data = (isset($body['data']) && is_array($body['data'])) ? $body['data'] : array();

function ax_esc($s) {
  return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

// Build an HTML table of the answers.
$rows = '';
foreach ($data as $label => $value) {
  $shown = ($value === '' || $value === null) ? '—' : $value;
  $rows .= '<tr>'
    . '<td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f8fafc;white-space:nowrap">' . ax_esc($label) . '</td>'
    . '<td style="padding:8px 12px;border:1px solid #e5e7eb">' . ax_esc($shown) . '</td>'
    . '</tr>';
}
$html = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:660px;margin:0 auto">'
  . '<h2 style="color:#1023cf;margin:0 0 4px">' . ax_esc($form) . '</h2>'
  . '<p style="color:#6b7280;margin:0 0 18px">New submission · ' . ax_esc($submittedAt) . '</p>'
  . '<table style="border-collapse:collapse;width:100%;font-size:14px">' . $rows . '</table>'
  . '</div>';

$applicant = '';
if (isset($data['Full name']) && $data['Full name'] !== '') {
  $applicant = $data['Full name'];
} elseif (isset($data['First name']) && $data['First name'] !== '') {
  $applicant = $data['First name'];
}
$subject = $form . ($applicant ? ' — ' . $applicant : '');

$payload = array(
  'from' => $FROM,
  'to' => $RECIPIENTS,
  'subject' => $subject,
  'html' => $html,
);
if (isset($data['Email']) && $data['Email'] !== '') {
  $payload['reply_to'] = $data['Email'];
}

// Send via the Resend API.
$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, array(
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => array(
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
  ),
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_TIMEOUT => 20,
));
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($curlErr) {
  http_response_code(502);
  echo json_encode(array('error' => 'Could not reach Resend', 'detail' => $curlErr));
  exit;
}
if ($status < 200 || $status >= 300) {
  http_response_code(502);
  echo json_encode(array('error' => 'Resend rejected the email', 'detail' => $response));
  exit;
}

echo json_encode(array('ok' => true));
