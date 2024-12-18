<?php
$host = '127.0.0.1';
$user = 'root';
$password = '';
$database = 'ajax';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
?>