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


elseif($data->fname !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.fname= '".$data->fname."' ");

}
elseif($data->lname !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.lname= '".$data->lname."' ");

}
elseif($data->phone_number !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.phone_number= '".$data->phone_number."' ");

}
elseif($data->email !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE customer.E-mail= '".$data->email."' ");

}
elseif($data->pickupDate !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.pickup_date= '".$data->pickupDate."' ");

}

elseif($data->returnDate !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.return_date= '".$data->returnDate."' ");

}
elseif($data->pickupOffice !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.Pickup_office= '".$data->pickupOffice."' ");

}
elseif($data->returnOffice !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.Return_office= '".$data->returnOffice."' ");

}
elseif($data->reservation_id !=""){
    $query1 = mysqli_query($con,"SELECT * FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
    WHERE reservation.reservation_id= '".$data->reservation_id."' ");

}
$row = mysqli_fetch_row($query1);
echo json_encode($row);



?>
