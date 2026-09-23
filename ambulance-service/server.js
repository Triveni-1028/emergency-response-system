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

const ambulanceRoutes = require("./routes/ambulanceRoutes");

app.use("/", ambulanceRoutes);

app.listen(3002, () => {
    console.log("Ambulance Service running on port 3002");
});