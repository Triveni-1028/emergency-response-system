CREATE DATABASE IF NOT EXISTS emergency_db;

USE emergency_db;

CREATE TABLE IF NOT EXISTS emergencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100),
    location VARCHAR(100),
    status VARCHAR(50)
);

INSERT INTO emergencies (type, location, status)
VALUES
('Medical Emergency', 'Mumbai', 'Pending'),
('Road Accident', 'Thane', 'Assigned');

SELECT * FROM emergencies;