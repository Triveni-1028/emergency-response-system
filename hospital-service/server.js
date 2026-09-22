const express = require("express");

const app = express();

app.use(express.json());

const hospitalRoutes = require("./routes/hospitalRoutes");

app.use("/", hospitalRoutes);

app.listen(3003, () => {
    console.log("Hospital Service running on port 3003");
});