const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/", notificationRoutes);

app.listen(3004, () => {
    console.log("Notification Service running on port 3004");
});