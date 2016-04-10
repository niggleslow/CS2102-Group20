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

$statement = "";

$count = 0;

foreach ($_POST as $key => $value){
	
	if ($value == ""){
		continue;
	}
	
	if ($key == "remaining_amount"){
		$statement = "$statement p.$key <= $value";
	} else {
		$statement = "$statement p.$key = '$value'";		
	}
	
	if ($count != count($_POST) - 1){
		$statement = "$statement AND";
	}
	
}


$dbconn = pg_connect("host=localhost port=5432 dbname=crowdfunding user=postgres password=root") or die("Could not connect: " . pg_last_error());


// select a row from the database for login and check that array is not empty
$query = "SELECT *
FROM projects p
WHERE $statement";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

$result = pg_fetch_all($result);


$answer = json_encode($result);

echo $answer;

?>