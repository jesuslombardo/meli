<?php

// En este script recibimos por get el parámetro día. consulto a la base de datos para obtener como fué el clima en ese día, finalmente construyo un array que devuelvo como respuesta tipo json
if(isset($_GET["dia"])){

  require_once('db.php');

  $dia = $_GET["dia"];
  $sentencia = $db->prepare("SELECT clima FROM weather WHERE dia=:dia");
  $sentencia->execute(['dia' => $dia]);
  $climaArray = $sentencia->fetchAll(PDO::FETCH_ASSOC)[0];
  $clima = $climaArray["clima"];

  $rta = [
    "dia" => $dia,
    "clima" => $clima
  ];

  $rtaApi = json_encode($rta, JSON_UNESCAPED_UNICODE);

  var_dump($rtaApi);

}


?>
