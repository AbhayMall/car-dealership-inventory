const express = require("express");
const cors  = require("cors");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200)
    .json({
        message : "Welcome to the Car Dealership Inventory API"
    });
});

app.use("/api/auth", authRoutes);


app.use("/api/vehicles", vehicleRoutes);

module.exports = app;