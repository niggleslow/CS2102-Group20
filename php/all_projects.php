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


// select a row from the database for login and check that array is not empty
$query = "SELECT * FROM projects";
$result = pg_query($query) or die("Query failed: " . pg_last_error());


$answer = json_encode($result);

echo $answer;

?>