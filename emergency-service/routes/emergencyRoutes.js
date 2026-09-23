const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    res.json({
        message: "Emergency Service is running"
    });
});

// Get emergencies
router.get("/emergencies", (req, res) => {
    db.query("SELECT * FROM emergencies", (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(results);
    });
});

// Add emergency
router.post("/emergencies", (req, res) => {
    const { type, location, status } = req.body;

    const sql = `
        INSERT INTO emergencies (type, location, status)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [type, location, status || "Pending"],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            res.json({
                message: "Emergency added successfully",
                emergency: {
                    id: result.insertId,
                    type: type,
                    location: location,
                    status: status || "Pending"
                }
            });
        }
    );
});

// Emergency → Ambulance
router.get("/request-ambulance", async (req, res) => {
    try {
        const response = await fetch(
            "http://ambulance-service:3002/ambulances"
        );

        const ambulances = await response.json();

        const availableAmbulance = ambulances.find(
            ambulance => ambulance.status === "Available"
        );

        if (!availableAmbulance) {
            return res.json({
                message: "No ambulance is currently available"
            });
        }

        res.json({
            message: "Ambulance found successfully",
            ambulance: availableAmbulance
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not communicate with Ambulance Service",
            error: error.message
        });
    }
});

module.exports = router;