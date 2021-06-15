<!--
<php

$username = $_POST['username'];
$password = $_POST['password'];

$con = mysqli_connect('localhost','root','','olshop');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM user WHERE username = '".$username."' AND WHERE password = '".$password."'";
$result = mysqli_query($con,$sql);

echo $result;
mysqli_close($con);
?>
-->
<?php
$dbhost = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "ulshop2"

$username = $_POST['username'];
$password = $_POST['password'];

// Create connection
$conn = new mysqli($dbhost, $dbusername, $dbpassword);

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
$sql = "SELECT * FROM users WHERE username = '$uname' AND WHERE password ='$pass';";

if ($conn->query($sql) === TRUE) {
  echo "[Success Message]";
} else {
#  echo "Error [Doing Something]: " . $conn->error;
  echo "Error : Username/Password is Wrong.";
}

 $conn->close(); 
?> 