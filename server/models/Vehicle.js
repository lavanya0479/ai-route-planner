const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  startLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

vehicleSchema.index({ startLocation: "2dsphere" });

module.exports = mongoose.model("Vehicle", vehicleSchema);
