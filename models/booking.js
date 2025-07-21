const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  stripePaymentIntentId: String
});

module.exports = mongoose.model("Booking", BookingSchema);
