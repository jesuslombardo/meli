<?php

// En este Script recibiremos via post un array con la data simulada del sistema solar
// ese array lo procesaremos y lo enviaremos a la base de datos en una tabla "weather"
// utilizamos el prepare de PDO por su rapida perfomance para operar multiples querys
if(isset($_POST)){

  require_once('db.php');

  $sql = "drop table $table";
  $sentencia = $db->prepare($sql);
  $sentencia->execute();


  $sql ="CREATE table $table(
    id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    dia INT( 11 ) NOT NULL,
    clima VARCHAR( 250 ) NOT NULL);";

    $sentencia = $db->prepare($sql);
    $sentencia->execute();


    if(isset($_POST['data'])){
      $sentencia = $db->prepare("INSERT INTO weather (dia, clima) VALUES (:dia, :clima)");
      $sentencia->bindParam(':dia', $dia);
      $sentencia->bindParam(':clima', $clima);

      foreach ($_POST['data'] as $day_data) {
        $dia = $day_data[0];
        $clima = $day_data[1];
        $sentencia->execute();
      }
      echo "OK DB";


    }


  }

  ?>
