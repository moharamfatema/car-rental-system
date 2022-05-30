<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("car_rental_system");
    $query = $mysqli->query("select * from customer where email='".$data->email."'");
    if($query->num_rows)
    {
        $error= array("error"=>"email-exists");
        echo json_encode($error);
    }
    else
    {
        $query = $mysqli->query("insert into customer (fname, lname, email, phone_number, password) 
        values ('".$data->fname."', '".$data->lname."', '".$data->email."', '".$data->phone_number."', md5('".$data->password."'));");
        $res = array('OK'=>1);
        echo json_encode($res);
    }
    ?>
