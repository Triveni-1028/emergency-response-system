const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Ambulance Service is running"
    });
});

router.get("/ambulances", (req, res) => {
    res.json([
        {
            id: 1,
            vehicleNumber: "MH01AB1234",
            driver: "Rahul",
            status: "Available"
        },
        {
            id: 2,
            vehicleNumber: "MH02CD5678",
            driver: "Amit",
            status: "Busy"
        }
    ]);
});
router.get("/find-hospital", async (req, res) => {
    try {
        const response = await fetch("http://hospital-service:3003/hospitals");

        const hospitals = await response.json();

        const availableHospital = hospitals.find(
            hospital =>
                hospital.availableBeds > 0 &&
                hospital.emergencyAvailable === true
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