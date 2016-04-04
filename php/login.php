<?php
// Start the session
session_start();
?>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=databasename user=yourusername password=yourpassword") or die("Could not connect: " . pg_last_error());


// select a row from the database for login and check that array is not empty
$query = "SELECT DISTINCT language FROM book";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

if (!empty($result)){
	
	$_SESSION["username"] = $result[0]["username"];
	
}


?>