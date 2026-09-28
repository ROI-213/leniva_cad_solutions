<?php
/**
 * Leniva CAD Solutions - PostgreSQL PDO Database Connection
 * Target Host: 168.119.64.101:5432 | Database: leniv698
 * Domain: lenivacad.roiclients.co.in
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDbConnection() {
    $host = '168.119.64.101';
    $port = '5432';
    $dbname = 'leniv698';
    $user = 'leniv698';
    $pass = 'hhvu1A8IrRupKLdfEDhnsx9LQ';

    try {
        $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit();
    }
}
