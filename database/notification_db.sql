CREATE DATABASE IF NOT EXISTS notification_db;

USE notification_db;

CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255),
    status VARCHAR(50)
);

INSERT INTO notifications (message, status)
VALUES
('Ambulance has been assigned', 'Sent'),
('Hospital has been assigned', 'Sent');

SELECT * FROM notifications;