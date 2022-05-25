/*customer login check*/
SELECT customer.customer_id
FROM customer
WHERE customer.email = 'input_email' AND customer.password = 'input_password';

/*duplicate email while registration check*/
SELECT customer.customer_id
FROM customer
WHERE customer.email = 'input_email';

/*registration insertions*/
INSERT INTO customer
VALUES ('id_input', 'fname_input', 'lname_input', 'email_input', 'phone_input', 'password_input');

/*reservation insertion, also update rented_by table*/

  