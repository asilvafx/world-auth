<?php

// Set Base URL (From Developers Portal API)
$apiUrl = "https://developer.worldcoin.org/api/v2/verify/";

// Set APP ID (From Developers Portal API)
$appId = isset($_GET['appId']) ? htmlspecialchars_decode($_GET['appId']) : "your_app_id";

// Set CORS headers
header('Access-Control-Allow-Origin: *'); // Replace with your frontend URL
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow GET, POST and OPTIONS methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header
header('Content-Type: application/json'); // Set the content type to application/json


if(!$appId) {
    http_response_code(204); // No Content
    exit;
} else {
    $appId = htmlspecialchars_decode($appId);
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Function to verify proof
function verifyProof($proof) {
    global $apiUrl;
    global $appId;

    $url = $apiUrl.$appId;

    // Initialize cURL
    $ch = curl_init($url);

    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? NULL),
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($proof));

    // Execute cURL request
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Close cURL
    curl_close($ch);

    // Handle response
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        return $data ?? null;
    }

    return false;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    // Log the input data for debugging
    error_log('Input data: ' . print_r($input, true));

    try {
        // Call the verifyProof function with the received proof
        $verified = verifyProof($input);

        if (!$verified) {
            // If verification fails
            http_response_code(401);
            echo json_encode(['message' => 'Verification failed', 'verified' => false]);
            exit;
        }

        // If verification is successful
        http_response_code(200);
        echo json_encode(['message' => 'Verification successful', 'verified' => true, 'data' => $verified]);

    } catch (Exception $e) {
        // Handle verification error
        error_log('Verification error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(['message' => 'Internal server error', 'error' => $e->getMessage()]);
    }
} else {
    // Handle unsupported HTTP methods
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['message' => 'Method Not Allowed']);
}
