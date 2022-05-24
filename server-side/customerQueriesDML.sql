SELECT car.plate_number, car.model, car.brand, car.`year`
FROM car JOIN car_at_office ON car.plate_number = car_at_office.plate_number JOIN office ON car_at_office.office_id = office.office_id
WHERE car.model = 'input' AND office.country = 'pickedCountry' AND car.status = 'active' AND
NOT EXISTS (SELECT rented_by.plate_number
            FROM rented_by
            WHERE car.plate_number = rented_by.plate_number
            );


SELECT car.plate_number, car.model, car.brand, car.`year`
FROM car JOIN car_at_office ON car.plate_number = car_at_office.plate_number JOIN office ON car_at_office.office_id = office.office_id
WHERE car.brand = 'input' AND office.country = 'pickedCountry' AND car.status = 'active' AND
NOT EXISTS (SELECT rented_by.plate_number
            FROM rented_by
            WHERE car.plate_number = rented_by.plate_number
            );


SELECT car.plate_number, car.model, car.brand, car.`year`
FROM car JOIN car_at_office ON car.plate_number = car_at_office.plate_number JOIN office ON car_at_office.office_id = office.office_id
WHERE car.year = 'input' AND office.country = 'pickedCountry' AND car.status = 'active' AND
NOT EXISTS (SELECT rented_by.plate_number
            FROM rented_by
            WHERE car.plate_number = rented_by.plate_number
            );