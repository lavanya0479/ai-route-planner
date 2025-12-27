const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  priority: {
    type: Number,
    default: 1
  }
});

deliverySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Delivery", deliverySchema);
