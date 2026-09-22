const express = require("express");

const app = express();

app.use(express.json());

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/", notificationRoutes);

app.listen(3004, () => {
    console.log("Notification Service running on port 3004");
});