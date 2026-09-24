const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    res.json({
        message: "Hospital Service is running"
    });
});

// Get hospitals
router.get("/hospitals", (req, res) => {
    db.query("SELECT * FROM hospitals", (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(results);
    });
});

// Add hospital
router.post("/hospitals", (req, res) => {
    const {
        name,
        location,
        availableBeds,
        emergencyAvailable
    } = req.body;

    const sql = `
        INSERT INTO hospitals
        (name, location, availableBeds, emergencyAvailable)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            location,
            availableBeds,
            emergencyAvailable
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            res.json({
                message: "Hospital added successfully",
                hospital: {
                    id: result.insertId,
                    name: name,
                    location: location,
                    availableBeds: availableBeds,
                    emergencyAvailable: emergencyAvailable
                }
            });
        }
    );
});

// Hospital → Notification
router.post("/notify", async (req, res) => {
    try {

        const message = req.body.message;

        const response = await fetch(
            "http://notification-service:3004/notifications",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    hospital: "City Care Hospital",
                    status: "Ready"
                })
            }
        );

        const notification = await response.json();

        res.json({
            message: "Notification Service contacted successfully",
            notification: notification
        });

    } catch (error) {

        res.status(500).json({
            message: "Could not communicate with Notification Service",
            error: error.message
        });

    }
});