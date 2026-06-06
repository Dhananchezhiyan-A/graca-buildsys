<?php
/**
 * GRACA BUILDSYS LLP - Contact Form Handler
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$company = isset($_POST['company']) ? trim(strip_tags($_POST['company'])) : '';
$mobile = isset($_POST['mobile']) ? trim(strip_tags($_POST['mobile'])) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$service = isset($_POST['service']) ? trim(strip_tags($_POST['service'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

if (empty($name) || empty($email) || empty($mobile) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$to = 'info@gracabuildsys.com';
$subject = 'New Inquiry from GRACA BUILDSYS Website - ' . $name;

$body = "New contact form submission:\n\n";
$body .= "Name: $name\n";
$body .= "Company: $company\n";
$body .= "Mobile: $mobile\n";
$body .= "Email: $email\n";
$body .= "Service Required: $service\n";
$body .= "Message:\n$message\n";
$body .= "\nSubmitted: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: noreply@gracabuildsys.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $body, $headers);

$logDir = __DIR__ . '/../logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0755, true);
}
$logEntry = date('Y-m-d H:i:s') . " | $name | $email | $mobile | $service\n";
@file_put_contents($logDir . '/inquiries.log', $logEntry, FILE_APPEND | LOCK_EX);

echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your inquiry has been submitted successfully.'
]);
