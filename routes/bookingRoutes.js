const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

const bookingControllers = require("../controllers/bookingControllers"); // ✅ Fix

// Fetch bookings of current user
router.get("/me", auth, async (req, res) => {
  try {
    console.log("Fetching bookings for:", req.user._id);

    const bookings = await Booking.find({ renter: req.user._id }).populate("listing");
    console.log("Bookings found:", bookings.length);

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Create a booking
router.post("/", auth, bookingControllers.createBooking); // ✅ Now works

// Cancel a booking
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.renter.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    await booking.deleteOne();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Cancel booking error:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

module.exports = router;
