# StockWatch API and Database Schema

This document contains the server-side PHP code for the API and the corresponding SQL database schema required for the application to function.

## API Endpoint

The application is configured to make all API calls to the following endpoint:
`https://sajfoods.net/dailyreport/api.php`

---

## `api.php` Server Code

```php
<?php
// Set headers for CORS and content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- Database Connection ---
// IMPORTANT: Replace with your actual database credentials
$servername = "localhost";
$username = "sajfood1_busa";
$password = "Haseem1234@";
$dbname = "sajfood1_busa-app";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => "Connection failed: " . $conn->connect_error]);
    exit();
}

// --- API Logic ---
// Get the posted data from the request body
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

// Check for valid JSON and action
if (!$data || !isset($data['action'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request. Action is missing.']);
    exit();
}

$action = $data['action'];
// The actual data payload is nested inside the 'data' key
$payload = isset($data['data']) ? $data['data'] : null;

switch ($action) {

    // =======================================
    // == DEPARTMENT / ADMIN ACTIONS        ==
    // =======================================

    case 'add_department':
        if (!isset($payload['departmentName']) || !isset($payload['email']) || !isset($payload['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields for department registration.']);
            break;
        }
        // Hash the password for security
        $hashed_password = password_hash($payload['password'], PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO departments (departmentName, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $payload['departmentName'], $payload['email'], $hashed_password);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Department registered successfully.']);
        } else {
            // Provide a more specific error if email is a unique constraint
            if ($stmt->errno == 1062) {
                 echo json_encode(['success' => false, 'message' => 'This email address is already registered.']);
            } else {
                 echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
            }
        }
        $stmt->close();
        break;

    case 'login_department':
        if (!isset($payload['email']) || !isset($payload['password'])) {
            echo json_encode(['success' => false, 'error' => 'Email and password are required.']);
            break;
        }
        $stmt = $conn->prepare("SELECT id, departmentName, email, password FROM departments WHERE email = ?");
        $stmt->bind_param("s", $payload['email']);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($user = $result->fetch_assoc()) {
            // Verify the hashed password
            if (password_verify($payload['password'], $user['password'])) {
                unset($user['password']); // Don't send password hash to client
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
        }
        $stmt->close();
        break;

    case 'get_departments':
        $result = $conn->query("SELECT id, departmentName, email FROM departments ORDER BY departmentName");
        $departments = [];
        while ($row = $result->fetch_assoc()) {
            $departments[] = $row;
        }
        echo json_encode(['success' => true, 'departments' => $departments]);
        break;

    // =======================================
    // == AGENT ACTIONS                     ==
    // =======================================

    case 'add_agent':
        if (!isset($payload['fullName']) || !isset($payload['email']) || !isset($payload['phone']) || !isset($payload['password'])) {
            echo json_encode(['success' => false, 'message' => 'Missing required fields for agent registration.']);
            break;
        }
        $hashed_password = password_hash($payload['password'], PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO agents (fullName, email, phone, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $payload['fullName'], $payload['email'], $payload['phone'], $hashed_password);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Agent registered successfully.']);
        } else {
             if ($stmt->errno == 1062) {
                 echo json_encode(['success' => false, 'message' => 'This email address is already registered.']);
            } else {
                 echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
            }
        }
        $stmt->close();
        break;

    case 'login_agent':
         if (!isset($payload['email']) || !isset($payload['password'])) {
            echo json_encode(['success' => false, 'error' => 'Email and password are required.']);
            break;
        }
        $stmt = $conn->prepare("SELECT id, fullName, email, phone, password FROM agents WHERE email = ?");
        $stmt->bind_param("s", $payload['email']);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($user = $result->fetch_assoc()) {
            if (password_verify($payload['password'], $user['password'])) {
                unset($user['password']);
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid email or password']);
        }
        $stmt->close();
        break;

    case 'get_agents':
        $result = $conn->query("SELECT id, fullName, email, phone FROM agents ORDER BY fullName");
        $agents = [];
        while ($row = $result->fetch_assoc()) {
            $agents[] = $row;
        }
        echo json_encode(['success' => true, 'agents' => $agents]);
        break;

    // =======================================
    // == STOCK REPORT ACTIONS              ==
    // =======================================
    
    case 'add_stock_report':
        $conn->begin_transaction();
        try {
            // Dates from frontend are strings, format them for MySQL DATE/DATETIME
            $dateOfVisit = date('Y-m-d', strtotime($payload['dateOfVisit']));

            $stmt = $conn->prepare("INSERT INTO stock_reports (salesAgentName, customerName, customerAddress, dateOfVisit, outstandingBalance) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssd", $payload['salesAgentName'], $payload['customerName'], $payload['customerAddress'], $dateOfVisit, $payload['outstandingBalance']);
            $stmt->execute();
            $report_id = $conn->insert_id;

            $product_stmt = $conn->prepare("INSERT INTO product_stock (report_id, productName, quantityRemaining, batchNumber, supplyDate, expiryDate, productCondition) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($payload['products'] as $product) {
                // Format dates for each product
                $supplyDate = date('Y-m-d', strtotime($product['supplyDate']));
                $expiryDate = date('Y-m-d', strtotime($product['expiryDate']));

                $product_stmt->bind_param("issssss", $report_id, $product['productName'], $product['quantityRemaining'], $product['batchNumber'], $supplyDate, $expiryDate, $product['productCondition']);
                $product_stmt->execute();
            }
            
            $conn->commit();
            echo json_encode(['success' => true, 'message' => 'Stock report submitted successfully.']);
        } catch (mysqli_sql_exception $exception) {
            $conn->rollback();
            echo json_encode(['success' => false, 'message' => 'Failed to submit report: ' . $exception->getMessage()]);
        }
        break;

    case 'get_stock_reports':
        $query = "SELECT * FROM stock_reports ORDER BY dateOfVisit DESC";
        $reports_result = $conn->query($query);
        $reports = [];
        while ($report = $reports_result->fetch_assoc()) {
            $product_query = "SELECT * FROM product_stock WHERE report_id = " . $report['id'];
            $products_result = $conn->query($product_query);
            $products = [];
            while ($product = $products_result->fetch_assoc()) {
                $products[] = $product;
            }
            $report['productss'] = $products; // 'productss' to match frontend type
            $reports[] = $report;
        }
        echo json_encode(['success' => true, 'reports' => $reports]);
        break;

    // --- Default case for unknown actions ---
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid action specified.']);
        break;
}

$conn->close();
?>
```

---

## Database Schema (SQL)

Here is the SQL needed to create the tables that the PHP script interacts with.

### `departments` table
```sql
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `agents` table
```sql
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `stock_reports` table
```sql
CREATE TABLE stock_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    salesAgentName VARCHAR(255) NOT NULL,
    customerName VARCHAR(255) NOT NULL,
    customerAddress TEXT,
    dateOfVisit DATE NOT NULL,
    outstandingBalance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `product_stock` table
```sql
CREATE TABLE product_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    productName VARCHAR(255) NOT NULL,
    quantityRemaining INT NOT NULL,
    batchNumber VARCHAR(255),
    supplyDate DATE,
    expiryDate DATE,
    productCondition VARCHAR(50), -- e.g., 'Good', 'Damaged', 'Expired'
    FOREIGN KEY (report_id) REFERENCES stock_reports(id) ON DELETE CASCADE
);
```
