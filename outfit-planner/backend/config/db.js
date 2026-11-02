// This file only has ONE job: connect to our MongoDB database

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() returns a "promise", so we use await
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    // If the database does not connect, there is no point running the app
    process.exit(1);
  }
};

module.exports = connectDB;
