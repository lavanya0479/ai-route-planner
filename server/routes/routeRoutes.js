const express = require("express");
const router = express.Router();

const {
  smartRoute,
  reRoute
} = require("../controllers/routeController");

router.post("/smart-route", smartRoute);
router.post("/re-route", reRoute);

module.exports = router;
