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

const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/", emergencyRoutes);

app.listen(3001, () => {
    console.log("Emergency Service running on port 3001");
});