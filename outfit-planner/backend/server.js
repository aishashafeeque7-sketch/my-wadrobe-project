// This is the starting point of our backend server

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const wardrobeRoutes = require("./routes/wardrobeRoutes");
const outfitRoutes = require("./routes/outfitRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // allows our React app to talk to this server
app.use(express.json()); // allows us to read JSON data sent in requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wardrobe", wardrobeRoutes);
app.use("/api/outfits", outfitRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("Outfit Planner API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
