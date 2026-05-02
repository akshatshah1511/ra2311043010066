require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const express = require("express");
const log = require("../logging_middleware/logger");

const app = express();
app.use(express.json());

// In-memory notifications store
let notifications = [];
let idCounter = 1;

// GET /notifications - fetch all notifications
app.get("/notifications", async (req, res) => {
    try {
        await log("backend", "info", "controller", "GET /notifications called");
        res.json({
            success: true,
            count: notifications.length,
            notifications
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /notifications - create a new notification
app.post("/notifications", async (req, res) => {
    try {
        const { title, message, type } = req.body;

        if (!title || !message) {
            return res.status(400).json({ success: false, error: "title and message are required" });
        }

        const notification = {
            id: idCounter++,
            title,
            message,
            type: type || "info",
            createdAt: new Date().toISOString()
        };

        notifications.push(notification);

        await log("backend", "info", "controller", "Notification created successfully");

        res.status(201).json({
            success: true,
            notification
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Notification server running at http://localhost:3000");
    console.log("Endpoints:");
    console.log("  GET  http://localhost:3000/notifications");
    console.log("  POST http://localhost:3000/notifications");
});
