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
$password = $_POST["password"];


$_SESSION["username"]= $username;


// select a row from the database for login and check that array is not empty
$query = "SELECT * FROM administrators WHERE username = '$username' AND password = '$password'";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

$result = pg_fetch_all($result);

$answer = array();

if (!empty($result)){
	$answer[] = "true";
} else {
	$answer[] = "false";
	
}

$answer = json_encode($answer);

echo $answer;


?>