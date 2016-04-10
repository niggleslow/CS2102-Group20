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
$original_title = $_POST["original_title"];

// select a row from the database for login and check that array is not empty
$query = "UPDATE projects SET title= '$title',description= '$description',start_date= '$start_date',duration= '$duration',category= '$category',amount= '$amount',remaining_amount= '$remaining_amount' WHERE title = '$original_title';";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

?>