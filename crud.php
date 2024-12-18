<?php
include 'db.php';

$action = $_GET['action'] ?? '';

if ($action == 'create') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $conn->query("INSERT INTO employee (name, email) VALUES ('$name', '$email')");
    echo json_encode(['message' => 'User created successfully']);
}
elseif ($action == 'read') {
    $result = $conn->query("SELECT * FROM employee");
    $employee = [];
    while ($row = $result->fetch_assoc()) {
        $employee[] = $row;
    }
    echo json_encode($employee);
} elseif ($action == 'update') {
    $id = $_POST['userId'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $conn->query("UPDATE employee SET name='$name', email='$email' WHERE id=$id");
    echo json_encode(['message' => 'User updated successfully']);
} elseif ($action == 'delete') {
    $id = $_GET['id'];
    $conn->query("DELETE FROM employee WHERE id=$id");
    echo json_encode(['message' => 'User deleted successfully']);
} elseif ($action == 'search') {
    $query = $_GET['query'];
    $result = $conn->query("SELECT * FROM employee WHERE name LIKE '%$query%' OR email LIKE '%$query%'");
    $employee = [];
    while ($row = $result->fetch_assoc()){
        $employee[] = $row;
    }
    echo json_encode($employee);
}
?>