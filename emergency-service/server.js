const express = require("express");

const app = express();

app.use(express.json());

const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/", emergencyRoutes);

app.listen(3001, () => {
    console.log("Emergency Service running on port 3001");
});