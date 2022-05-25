/*all reservations within a specified period including all car and customer
information*/
/* (no reservation_date attribute) */

SELECT R.plate_number, C.model, C.brand, C.year, C.status, R.customer_id, CU.fname, CU.lname, CU.email, Cu.phone_number, CU.password, R.pickup_date, R.reservation_id, R.pickup_office, R.return_office, R.booking_status, R.payment_status
FROM reservation AS R JOIN car AS C ON R.plate_number = C.plate_number JOIN customer AS CU ON R.customer_id = CU.customer_id
WHERE R.pickup_date BETWEEN 'from_date_input' AND 'to_date_input';

/*all reservations of any car within a specified period including all car
information*/

SELECT car.plate_number , car.model, car.brand car.year , car.status FROM (car RIGHT JOIN reservation ON car.plate_number=reservation.plate_number) 
WHERE reservation.pickup_date BETWEEN 'from_date_input' AND 'to_date_input' 


/*the status of all cars on a specific day*/


SELECT car.status FROM (car LEFT JOIN reservation ON car.plate_number=reservation.plate_number) WHERE reservation.pickup_date='from_date_input' 

/*all reservations of specific customer including customer information, car
model and plate id*/

SELECT CU.customer_id, CU.fname, CU.lname, CU.email, CU.phone_number, CU.password, C.model, C.plate_number, R.Pickup_date, R.reservation_id, R.pickup_office, R.return_office, R.return_date, R.booking_status, R.payment_status
FROM customer AS CU LEFT JOIN reservation AS R ON CU.customer_id = R.customer_id JOIN car AS C ON R.plate_number = C.plate_number;




/*daily payments within specific period*/

