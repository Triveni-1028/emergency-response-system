CREATE DATABASE IF NOT EXISTS hospital_db;

USE hospital_db;

CREATE TABLE IF NOT EXISTS hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    availableBeds INT,
    emergencyAvailable BOOLEAN
);

INSERT INTO hospitals (name, location, availableBeds, emergencyAvailable)
VALUES
('City Care Hospital', 'Mumbai', 10, TRUE),
('LifeLine Hospital', 'Thane', 5, TRUE);

SELECT * FROM hospitals;