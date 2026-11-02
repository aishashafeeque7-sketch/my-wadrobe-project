// This file describes what a "User" looks like in our database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // no two users can have the same email
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // this will be the HASHED password, never the real one
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
