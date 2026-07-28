const express = require("express");
const cors  = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200)
    .json({
        message : "Welcome to the Car Dealership Inventory API"
    });
});

module.exports = app;