const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    res.json({
        message: "Ambulance Service is running"
    });
});

router.get("/ambulances", (req, res) => {

    db.query("SELECT * FROM ambulances", (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(results);
    });
});

router.get("/find-hospital", async (req, res) => {
    try {
        const response = await fetch("http://hospital-service:3003/hospitals");

        const hospitals = await response.json();

        const availableHospital = hospitals.find(
           hospital =>
    hospital.availableBeds > 0 &&
    hospital.emergencyAvailable === 1
        );

        if (!availableHospital) {
            return res.json({
                message: "No hospital is currently available"
            });
        }

        res.json({
            message: "Hospital found successfully",
            hospital: availableHospital
        });

    } catch (error) {
        res.status(500).json({
            message: "Could not communicate with Hospital Service",
            error: error.message
        });
    }
});

module.exports = router;