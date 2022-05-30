<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type,location");
    
    session_start();
    $mysqli = new mysqli("localhost","root");    
    $mysqli -> select_db("car_rental_system");

    //customer enters single input-->search the table on that input for the three specifications
    
    $query = $mysqli->query("SELECT car.plate_number, car.model, car.brand, car.`year`
    FROM car JOIN car_at_office ON car.plate_number = car_at_office.plate_number JOIN office ON car_at_office.office_id = office.office_id
    WHERE office.country = data->country AND (car.model = data->input OR car.brand = data->input OR car.`year` = data->input) AND
    car.status = 'active' AND
    NOT EXISTS (SELECT rented_by.plate_number
              FROM rented_by
              WHERE car.plate_number = rented_by.plate_number
              );
     )");

    if($query->num_rows)
    {
        //show results
        //header('Location: page.php');
        $row = mysqli_fetch_row($query);
        echo json_encode($row);
    }
    else
    {
         $error= array("error"=>"No cars with the entered specification found.");
         echo json_encode($error);
    }
    ?>
