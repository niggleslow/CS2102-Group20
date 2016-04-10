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

$username = $_POST["username"];


$query = "DELETE FROM entrepreneurs WHERE username = '$username';";
$result = pg_query($query) or die("Query failed: " . pg_last_error());


?>