<?php
$json = file_get_contents('php://input');
$data = json_decode($json);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,location");

session_start();
$con= mysqli_connect('localhost','root','','car_rental_system')or die("Connection failed: " . mysqli_connect_error());


if($data->customerID !=""){

    $query = mysqli_query($con,"SELECT CU.customer_id, CU.fname, CU.lname, CU.email, CU.phone_number, CU.password, C.model, C.plate_number, R.Pickup_date, R.reservation_id, R.pickup_office, R.return_office, R.return_date, R.booking_status, R.payment_status
    FROM(customer AS CU LEFT JOIN reservation AS R ON CU.customer_id = R.customer_id JOIN car AS C ON R.plate_number = C.plate_number) WHERE CU.customer_id='".$data->customerID."' ")or die (mysqli_connect_error());
    $row = mysqli_fetch_row($query);
    echo json_encode($row);

}


