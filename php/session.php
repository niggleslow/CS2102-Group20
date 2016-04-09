<?php
// Start the session
session_start();

$answer = array();

if (isset($answer["username"])){
	$answer["username"] = $_SESSION["username"];
	$answer["logged_in"] = $_SESSION["logged_in"];
	$answer["type"] = $_SESSION["type"];
} else {
	$answer["username"] = "";
	$answer["logged_in"] = "false";
	$answer["type"] = "";
}


$answer = json_encode($answer);

echo $answer;

?>