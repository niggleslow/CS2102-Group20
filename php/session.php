<?php
// Start the session
session_start();

$answer = array();

$answer["username"] = $_SESSION["username"];
$answer["logged_in"] = $_SESSION["logged_in"];
$answer["type"] = $_SESSION["type"];

$answer = json_encode($answer);

echo $answer;

?>