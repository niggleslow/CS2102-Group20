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

$username = $_SESSION["username"];
$project_title = $_POST["project_title"];
$amount_pledged = $_POST["amount_pledged"];

$query = "SELECT * FROM projects where title = '$project_title';";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

$result = pg_fetch_all($result);

$amt = $result[0]["remaining_amount"];

$amt = $amt - $amount_pledged;


$query = "UPDATE projects SET remaining_amount= '$amt' WHERE title = '$project_title';";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

$query = "INSERT INTO funding(username, project_title, amount_pledged) VALUES ('$username', '$project_title', '$amount_pledged');";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

?>