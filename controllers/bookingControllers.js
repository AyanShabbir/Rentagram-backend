const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

exports.createBooking = async (req, res) => {
  const { listingId, startDate, endDate, totalPrice, stripePaymentIntentId } = req.body;

  try {
    const booking = await Booking.create({
      listing: listingId,
      renter: req.user._id,
      startDate,
      endDate,
      totalPrice,
      stripePaymentIntentId,
      isPaid: true // Assume success for MVP
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err); // 👈 log full error
    res.status(500).json({ message: err.message || "Booking failed" });

  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user })
      .populate("listing")
      .sort({ startDate: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookings" });
  }
};
