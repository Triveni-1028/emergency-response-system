const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Notification Service is running"
    });
});

router.get("/notifications", (req, res) => {
    res.json([
        {
            id: 1,
            message: "Ambulance has been assigned",
            status: "Sent"
        },
        {
            id: 2,
            message: "Hospital has been assigned",
            status: "Sent"
        }
    ]);
});

router.post("/notifications", (req, res) => {
    const notification = req.body;

    res.json({
        message: "Notification sent successfully",
        notification: notification
    });
});

module.exports = router;