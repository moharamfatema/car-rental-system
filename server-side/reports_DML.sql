/*all reservations within a specified period including all car and customer
information*/
/* (no reservation_date attribute) */

SELECT R.plate_number, C.model, C.brand, C.year, C.status, R.customer_id, CU.fname, CU.lname, CU.email, Cu.phone_number, CU.password, R.pickup_date, R.reservation_id, R.pickup_office, R.return_office, R.booking_status, R.payment_status
FROM reservation AS R JOIN car AS C ON R.plate_number = C.plate_number JOIN customer AS CU ON R.customer_id = CU.customer_id
WHERE R.pickup_date BETWEEN '2022-01-01' AND '2022-12-01';

/*all reservations of any car within a specified period including all car
information*/

