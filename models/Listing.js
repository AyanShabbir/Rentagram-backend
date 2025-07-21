const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String], // URLs for now
  pricePerDay: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model("Listing", ListingSchema);
