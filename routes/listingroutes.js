const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const {
  createListing,
  getAllListings,
  getListingById,
} = require("../controllers/listingcontrollers");
const auth = require("../middleware/auth");


router.patch("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.owner.toString() !== req.user._id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(listing, req.body);
    await listing.save();

    res.json(listing);
  } catch (err) {
    console.error("Update listing error:", err);
    res.status(500).json({ message: "Failed to update listing" });
  }
});

// Add before ":id" route
router.get("/me", auth, async (req, res) => {
  try {
    console.log("User ID in /me route:", req.user._id);

    // const listings = await Listing.find({ owner: req.user._id });
    // console.log("Listings found:", listings.length);
    const listings = await Listing.find({ owner: req.user });
    console.log("Listings found:", req.user);

    res.json(listings);
  } catch (err) {
    console.error("Error fetching listings for user:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});



// Delete listing (only by owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.owner.toString() !== req.user._id)

      return res.status(403).json({ message: "Not authorized" });

    await listing.deleteOne();
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Delete listing error:", err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
});


router.post("/", auth, createListing);
router.get("/", getAllListings);
router.get("/:id", getListingById);

module.exports = router;
