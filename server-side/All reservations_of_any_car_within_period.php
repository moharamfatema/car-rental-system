<?php
$json = file_get_contents('php://input');
$data = json_decode($json);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,location");

session_start();
$con= mysqli_connect('localhost','root','','car_rental_system')or die("Connection failed: " . mysqli_connect_error());


if($data->FromDate !="" && $data->ToDate!=""){

    $query = mysqli_query($con,"SELECT car.plate_number , car.model, car.brand car.year , car.status FROM (car RIGHT JOIN reservation ON car.plate_number=reservation.plate_number) 
    WHERE reservation.pickup_date BETWEEN '".$data->FromDate."' AND '".$data->ToDate."' ")or die (mysqli_connect_error());
    $row = mysqli_fetch_row($query);
    echo json_encode($row);

}