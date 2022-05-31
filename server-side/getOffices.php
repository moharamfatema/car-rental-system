<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("car_rental_system");

    //customer enters single input-->search the table on that input for the three specifications
    
    $query = $mysqli->query("SELECT * FROM office");

    if($query->num_rows)
    {
        //show results
        //header('Location: page.php');
        $row = mysqli_fetch_all($query,MYSQLI_ASSOC);
        echo json_encode($row);
    }
    else
    {
         $error= array("error"=>"no-offices");
         echo json_encode($error);
    }
    ?>
