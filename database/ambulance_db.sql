CREATE DATABASE IF NOT EXISTS ambulance_db;

USE ambulance_db;

CREATE TABLE IF NOT EXISTS ambulances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleNumber VARCHAR(50),
    driver VARCHAR(100),
    status VARCHAR(50)
);

INSERT INTO ambulances (vehicleNumber, driver, status)
VALUES
('MH01AB1234', 'Rahul', 'Available'),
('MH02CD5678', 'Amit', 'Busy');

SELECT * FROM ambulances;