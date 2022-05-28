<?php
$json = file_get_contents('php://input');
$data = json_decode($json);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,location");

session_start();
$con= mysqli_connect('localhost','root','','car_rental_system')or die("Connection failed: " . mysqli_connect_error());


if($data->FromDate !="" && $data->ToDate!=""){

    $query = mysqli_query($con,"SELECT R.plate_number, C.model, C.brand, C.year, C.status, R.customer_id, CU.fname, CU.lname, CU.email, Cu.phone_number, CU.password, R.pickup_date, R.reservation_id, R.pickup_office, R.return_office, R.booking_status, R.payment_status
    FROM reservation AS R JOIN car AS C ON R.plate_number = C.plate_number JOIN customer AS CU ON R.customer_id = CU.customer_id
    WHERE R.pickup_date BETWEEN '".$data->FromDate."' AND '".$data->ToDate."' ")or die (mysqli_connect_error());
    $row = mysqli_fetch_row($query);
    echo json_encode($row);

}