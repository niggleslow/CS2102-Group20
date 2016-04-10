<?php
// Start the session
session_start();
?>

<?php


function pr($result){
	echo "<pre>";
	
	print_r($result);
	
	echo "</pre>";
}

$dbconn = pg_connect("host=localhost port=5432 dbname=crowdfunding user=postgres password=root") or die("Could not connect: " . pg_last_error());

$title = $_POST["title"];
$description = $_POST["description"];
$start_date = $_POST["start_date"];
$duration = $_POST["duration"];
$category = $_POST["category"];
$amount = $_POST["amount"];
$remaining_amount = $_POST["remaining_amount"];

$username = $_SESSION["username"];

// select a row from the database for login and check that array is not empty
$query = "INSERT INTO projects(title, description, start_date, duration, category, remaining_amount, e_name, amount) VALUES ('$title', '$description', '$start_date', '$duration', '$category', '$remaining_amount', '$username', '$amount')";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

// select a row from the database for login and check that array is not empty
$query = "INSERT INTO create_project(entrepreneur_name, project_title) VALUES ('$username', '$title')";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

?>