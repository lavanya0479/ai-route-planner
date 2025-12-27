const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("AI Route Planner API Running");
});

const deliveryRoutes = require("./routes/deliveryRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const routeRoutes = require("./routes/routeRoutes");

app.use("/api/deliveries", deliveryRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/routes", routeRoutes);

const predictTraffic = require("./services/trafficPredictor");

app.get("/api/test-traffic", async (req, res) => {
  const result = await predictTraffic({
    city: "Bangalore",
    day: "Monday",
    time: "9 AM"
  });
  res.json(result);
});

module.exports = app;
