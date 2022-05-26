<?php 
$json = file_get_contents('php://input');
$data = json_decode($json);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,location");

session_start();
$con= mysqli_connect('localhost','root','','car_rental_system')or die("Connection failed: " . mysqli_connect_error());

if($data->plateNumber !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE car.plate_number= '".$data->plateNumber."' ");
}

elseif($data->model !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE car.model= '".$data->model."' ");

}
elseif($data->brand !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE car.brand= '".$data->brand."' ");

}
elseif($data->year !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE car.year= '".$data->year."' ");

}
elseif($data->status !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE car.status= '".$data->status."' ");

}
elseif($data->customerID !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.customer_id= '".$data->customerID."' ");

}
elseif($data->Fname !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.fname= '".$data->Fname."' ");

}
elseif($data->Lname !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.lname= '".$data->Lname."' ");

}
elseif($data->phoneNum !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.phone_number= '".$data->phoneNum."' ");

}
elseif($data->reservationDate !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.pickup_date= '".$data->reservationDate."' ");

}
elseif($data->reservationID !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.reservation_id= '".$data->reservationID."' ");

}



?>