// This file describes what one "Clothing Item" in a user's wardrobe looks like

const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema(
  {
    // Which user this item belongs to
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true, // e.g. "Blue denim jacket"
    },
    category: {
      type: String,
      required: true,
      enum: ["Top", "Bottom", "Dress", "Shoes", "Bag", "Accessory"],
    },
    color: {
      type: String,
      required: true, // e.g. "black", "white", "beige" - keep it simple, lowercase
      lowercase: true,
    },
    occasion: {
      type: String,
      required: true,
      enum: ["Casual", "Office", "Party", "Wedding", "Festive", "Workout"],
    },
    imageUrl: {
      type: String,
      required: true, // a link to the image (we are not uploading real files, just using links)
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
