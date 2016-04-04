<?php
// Start the session
session_start();
?>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=databasename user=yourusername password=yourpassword") or die("Could not connect: " . pg_last_error());


// select projects for a particular entrpreneur
$query = "SELECT DISTINCT language FROM book";
$result = pg_query($query) or die("Query failed: " . pg_last_error());

// return result as a json

return json_decode($result);

?>