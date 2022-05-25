SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE car.plate_number='Plate_Num'

SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE car.brand='brand'


SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE car.model='Model'


SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE customer.fname='Fname' AND customer.lname='Lname'

SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE customer.customer_id='Id'

SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE customer.phone_number='Phone_Num'




SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE reservation.pickup_date='Date'


SELECT car.plate_number , car.model , customer.customer_id , GROUP_CONCAT(customer.fname,customer.lname) , reservation.pickup_date ,reservation.reservation_id 
FROM ((reservation INNER JOIN car ON reservation.plate_number=car.plate_number)INNER JOIN customer ON reservation.customer_id=customer.customer_id) 
WHERE reservation.reservation_id='reserv_id'
