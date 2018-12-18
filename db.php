<?php

// Conexion a la base de de datos
$servername = "localhost";
$dbname= "jl_db";
$username = "jl_db";
$password = "mmhP73!5";
$table = "weather";

try {
  $db = new PDO(
    "mysql:host=$servername;dbname=$dbname",
    $username,
    $password
  );

  $db->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAME'utf8'");
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //Database connection established;
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}

?>
