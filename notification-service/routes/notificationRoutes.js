const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {
    res.json({
        message: "Notification Service is running"
    });
});

router.get("/notifications", (req, res) => {

    db.query("SELECT * FROM notifications", (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json(results);
    });
});

router.post("/notifications", (req, res) => {

    const { message, status } = req.body;

    const sql = `
        INSERT INTO notifications (message, status)
        VALUES (?, ?)
    `;

    db.query(sql, [message, status || "Sent"], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json({
            message: "Notification sent successfully",
            notification: {
                id: result.insertId,
                message: message,
                status: status || "Sent"
            }
        });
    });
});

module.exports = router;