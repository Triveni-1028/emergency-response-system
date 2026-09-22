const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Emergency Service is running"
    });
});

router.get("/emergencies", (req, res) => {
    res.json([
        {
            id: 1,
            type: "Medical Emergency",
            location: "Mumbai",
            status: "Pending"
        },
        {
            id: 2,
            type: "Road Accident",
            location: "Thane",
            status: "Assigned"
        }
    ]);
});
router.get("/request-ambulance", async (req, res) => {
    try {
        const response = await fetch("http://ambulance-service:3002/ambulances");

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