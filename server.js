require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userroutes');

dotenv.config();
connectDB();

const app = express();

// Manual CORS headers - this should definitely work
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});


app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/listings", require("./routes/listingroutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/stripe", require("./routes/stripeRoutes"));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));