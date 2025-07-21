const Listing = require("../models/Listing");

exports.createListing = async (req, res) => {
  const { title, description, images, pricePerDay, securityDeposit } = req.body;

  try {
    console.log("User in createListing:", req.user); // 👈 Confirm user exists

    const listing = await Listing.create({
      title,
      description,
      images,
      pricePerDay,
      securityDeposit,
      owner: req.user._id,
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error("❌ Error creating listing:", err); // 👈 This is key!
    res.status(500).json({ message: "Failed to create listing" });
  }
};


exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "name email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "name email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};
