<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

$pdo = getDbConnection();

try {
    $stmt = $pdo->query("SELECT version(), current_database(), current_user, NOW() as server_time");
    $info = $stmt->fetch();

    echo json_encode([
        'status' => 'ok',
        'engine' => 'PHP PDO PostgreSQL Direct Connection',
        'database' => $info['current_database'],
        'user' => $info['current_user'],
        'version' => $info['version'],
        'serverTime' => $info['server_time'],
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
