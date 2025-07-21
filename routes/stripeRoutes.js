// console.log("Stripe route hit!");

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const auth = require("../middleware/auth");

router.post("/create-payment-intent", auth, async (req, res) => {
  // router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    console.log("Creating payment intent with amount:", amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: "usd"
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ message: "Stripe error" });
  }
});

module.exports = router;
