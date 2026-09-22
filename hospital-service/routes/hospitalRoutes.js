const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hospital Service is running"
    });
});

router.get("/hospitals", (req, res) => {
    res.json([
        {
            id: 1,
            name: "City Care Hospital",
            location: "Mumbai",
            availableBeds: 10,
            emergencyAvailable: true
        },
        {
            id: 2,
            name: "LifeLine Hospital",
            location: "Thane",
            availableBeds: 5,
            emergencyAvailable: true
        }
    ]);
});
router.post("/notify", async (req, res) => {
    try {
        const response = await fetch("http://notification-service:3004/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Hospital is ready for emergency patient",
                hospital: "City Care Hospital",
                status: "Ready"
            })
        });

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
module.exports = router;