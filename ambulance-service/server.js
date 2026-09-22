const express = require("express");

const app = express();

app.use(express.json());

const ambulanceRoutes = require("./routes/ambulanceRoutes");

app.use("/", ambulanceRoutes);

app.listen(3002, () => {
    console.log("Ambulance Service running on port 3002");
});