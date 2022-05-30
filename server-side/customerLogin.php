<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("car_rental_system");
    $query = $mysqli->query("select * from customer where email='".$data->email."' AND password=md5('".$data->password."') ");
    if($query->num_rows)
    {
        //login success, go to search/reservation page
        //header('Location: page.php');
        $result = mysqli_fetch_assoc($query);
		//print_r($result);
        if($result["customer_id"] == 2){
            $isAdmin = "True";
        }else{
            $isAdmin = "False";
        }
        $res = array("OK"=>1, "isAdmin"=>$isAdmin,"customer_id"=>$result["customer_id"]);
        echo json_encode($res);
    }
    else
    {
         $error= array("error"=>"Incorrect e-mail or password.");
         echo json_encode($error);
    }
    ?>
