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
	
	if ($key == "remaining_amount"){
		$statement = "$statement p.$key <= $value";
	} else {
		$statement = "$statement p.$key = '$value'";		
	}
	
	if ($count != count($_POST) - 1){
		$statement = "$statement AND";
	}
	
}


// select a row from the database for login and check that array is not empty
$query = "SELECT *
FROM project p
WHERE $statement";
$result = pg_query($query) or die("Query failed: " . pg_last_error());


$answer = json_encode($result);

echo $answer;

?>