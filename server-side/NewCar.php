<?php
$json = file_get_contents('php://input');
$data = json_decode($json);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,location");

session_start();
$con= mysqli_connect('localhost','root','','car_rental_system')or die("Connection failed: " . mysqli_connect_error());


if($data->plateNumber !="" && $data->model!=""&&$data->brand!=""&&$data->year!=""&&$data->status!=""){
  $query1 = mysqli_query($con,"select * from car where plate_number = '".$data->plateNumber."' ")or die (mysqli_connect_error());
  $row = mysqli_fetch_row($query1);
  if($row){
    $error= array("error"=>"car exists!");
    echo json_encode($error);

  }
  else {
    $query = mysqli_query($con,"insert into car (`plate_number`,`model`,`brand`,`year`,`status`)values('$data->plateNumber','$data->model','$data->brand','$data->year','$data->status')");
    $res = array('OK'=>1);
    echo json_encode($res);
  }
}

?>


 