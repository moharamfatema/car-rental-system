CREATE DATABASE Car_Rental_System;

CREATE TABLE customer(
    customer_id int,
    fname varchar(255),
    lname varchar(255),
    email varchar(255) UNIQUE,
    phone_number varchar(255) UNIQUE,
    `password` varchar(255),
    PRIMARY KEY(customer_id)
    );

CREATE TABLE car(
    plate_number int,
    model varchar(255),
    brand varchar(255),
    `year` year,
    `status` ENUM('active', 'out_of_service'),
    PRIMARY KEY(plate_number)
    );

CREATE TABLE office(
    office_id int,
    country varchar(255),
    city varchar(255),
    address varchar(255),
    PRIMARY KEY(office_id)
    );

CREATE TABLE rented_by(
    plate_number int,
    customer_id int,
    PRIMARY KEY(plate_number, customer_id)
    );

CREATE TABLE car_at_office(
    office_id int,
    plate_number int,
    PRIMARY KEY(office_id, plate_num)
    );

CREATE TABLE reservation(
    plate_number int,
    customer_id int,
    pickup_date datetime,
    reservation_id int UNIQUE,
    pickup_office int,
    return_office int,
    return_date datetime,
    booking_status ENUM('rented', 'returned'),
    payment_status ENUM('paid', 'not_paid'),
    PRIMARY KEY(plate_number, customer_id, pickup_date)
    );

ALTER TABLE rented_by
ADD FOREIGN KEY(plate_number) REFERENCES car(plate_number),
ADD FOREIGN KEY(customer_id) REFERENCES customer(customer_id);

ALTER TABLE car_at_office
ADD FOREIGN KEY(office_id) REFERENCES office(office_id),
ADD FOREIGN KEY(plate_number) REFERENCES car(plate_number);

ALTER TABLE reservation
ADD FOREIGN KEY(plate_number) REFERENCES car(plate_number),
ADD FOREIGN KEY(customer_id) REFERENCES customer(customer_id),
ADD FOREIGN KEY(pickup_office) REFERENCES office(office_id),
ADD FOREIGN KEY(return_office) REFERENCES office(office_id);
