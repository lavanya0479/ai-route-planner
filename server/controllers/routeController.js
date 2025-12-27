// const Delivery = require("../models/Delivery");
// const Vehicle = require("../models/Vehicle");
// const optimizeRoute = require("../services/routeOptimizer");
// const predictTraffic = require("../services/trafficPredictor");

// // ---------- NORMAL OPTIMIZATION ----------
// exports.smartRoute = async (req, res) => {
//   try {
//     const deliveries = await Delivery.find();
//     const vehicles = await Vehicle.find();

//     const traffic = await predictTraffic({
//       city: "Bangalore",
//       day: "Monday",
//       time: "9 AM"
//     });

//     const result = optimizeRoute(
//       deliveries,
//       vehicles[0],
//       traffic.multiplier
//     );

//     res.json({
//       traffic,
//       route: [...new Set(result.route.map(d => d.address))],
//       totalDistance: result.totalDistance,
//       eta: result.eta
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Smart route failed" });
//   }
// };

// // ---------- RE-ROUTE WITH INCIDENT ----------
// exports.reRoute = async (req, res) => {
//   try {
//     let deliveries = await Delivery.find();
//     const vehicles = await Vehicle.find();

//     const traffic = await predictTraffic({
//       city: "Bangalore",
//       day: "Monday",
//       time: "6 PM"
//     });

//     // 🔥 SIMULATE ROAD BLOCK: remove middle delivery
//     if (deliveries.length > 2) {
//       deliveries.splice(1, 1); // remove 2nd delivery
//     }

//     const INCIDENT_PENALTY = 1.5;

//     const result = optimizeRoute(
//       deliveries,
//       vehicles[0],
//       traffic.multiplier * INCIDENT_PENALTY
//     );

//     res.json({
//       traffic: {
//         traffic: traffic.traffic + " (Incident)",
//         multiplier: traffic.multiplier * INCIDENT_PENALTY
//       },
//       route: [...new Set(result.route.map(d => d.address))],
//       totalDistance: result.totalDistance,
//       eta: result.eta
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Re-route failed" });
//   }
// };
const Delivery = require("../models/Delivery");
const Vehicle = require("../models/Vehicle");
const optimizeRoute = require("../services/routeOptimizer");
const predictTraffic = require("../services/trafficPredictor");

// ---------- NORMAL OPTIMIZATION ----------
exports.smartRoute = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    const vehicles = await Vehicle.find();

    if (!deliveries.length || !vehicles.length) {
      return res.status(400).json({
        error: "Deliveries or vehicles missing"
      });
    }

    const traffic = await predictTraffic({
      city: "Bangalore",
      day: "Monday",
      time: "9 AM"
    });

    const result = optimizeRoute(
      deliveries,
      vehicles[0],
      traffic.multiplier
    );

    res.json({
      traffic,
      route: result.route.map(d => d.address),
      totalDistance: result.totalDistance,
      eta: result.eta
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Smart route failed" });
  }
};

// ---------- RE-ROUTE WITH INCIDENT ----------
exports.reRoute = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    const vehicles = await Vehicle.find();

    if (!deliveries.length || !vehicles.length) {
      return res.status(400).json({
        error: "Deliveries or vehicles missing"
      });
    }

    const traffic = await predictTraffic({
      city: "Bangalore",
      day: "Monday",
      time: "6 PM"
    });

    // 🔥 INCIDENT SIMULATION (non-mutating)
    const incidentDeliveries =
      deliveries.length > 2
        ? deliveries.filter((_, i) => i !== 1)
        : deliveries;

    const INCIDENT_PENALTY = 1.5;

    const result = optimizeRoute(
      incidentDeliveries,
      vehicles[0],
      traffic.multiplier * INCIDENT_PENALTY
    );

    res.json({
      traffic: {
        traffic: traffic.traffic + " (Incident)",
        multiplier: traffic.multiplier * INCIDENT_PENALTY
      },
      route: result.route.map(d => d.address),
      totalDistance: result.totalDistance,
      eta: result.eta
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Re-route failed" });
  }
};

