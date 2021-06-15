<!--<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="utf-8">
  <title>D'Vica Store Login</title>
  <link rel="stylesheet" href="index.css">
  <meta name="viewport" content="width= device-width, initial-scale= 1">
  <meta name="description" content="[Useful Description. Mainly Used in Link Sharing(quickload of sorts)">
  <script defer src="index.js"></script>
</head>
</html>
-->
 <?php
$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";


#$sql = "CREATE TABLE MyGuests (
#id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
#firstname VARCHAR(30) NOT NULL,
#lastname VARCHAR(30) NOT NULL,
#email VARCHAR(50),
#reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
#)";
$sql = "[SQL Query]";

if ($conn->query($sql) === TRUE) {
  echo "[Success Message]";
} else {
  echo "Error [Doing Something]: " . $conn->error;
}

 $conn->close(); 
?> 