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
$amount_pledged = int($_POST["amount_pledged"]);


$query = "INSERT INTO funding(user, project_title, amount_pledged) VALUES ('$username', '$project_title', $amount_pledged);";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

$query = "UPDATE projects SET funding= (funding - $amount_pledged) WHERE title = '$project_title';";
$result = pg_query($query) or die("Query failed: " . pg_last_error());



?>