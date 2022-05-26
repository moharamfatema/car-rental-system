<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("car_rental_system");
    $query = $mysqli->query("select * from user where email='".$data->email."' AND password='".$data->password."' ");
    if($query->num_rows)
    {
        //login success, go to search/reservation page
        header('Location: page.php');

    }
    else
    {
         $error= array("error"=>"Incorrect e-mail or password.");
         echo json_encode($error);
    }
    ?>
