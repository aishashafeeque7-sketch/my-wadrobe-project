// Routes for adding, viewing, and deleting wardrobe items

const express = require("express");
const ClothingItem = require("../models/ClothingItem");
const protect = require("../middleware/auth");

const router = express.Router();

// Every route below this line requires the user to be logged in
router.use(protect);

// @route   GET /api/wardrobe
// @desc    Get all clothing items that belong to the logged-in user
router.get("/", async (req, res) => {
  try {
    const items = await ClothingItem.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Could not get wardrobe items", error: error.message });
  }
});

// @route   POST /api/wardrobe
// @desc    Add a new clothing item to the wardrobe
router.post("/", async (req, res) => {
  try {
    const { name, category, color, occasion, imageUrl } = req.body;

    if (!name || !category || !color || !occasion || !imageUrl) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newItem = await ClothingItem.create({
      user: req.userId,
      name,
      category,
      color,
      occasion,
      imageUrl,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Could not add item", error: error.message });
  }
});

// @route   DELETE /api/wardrobe/:id
// @desc    Delete one clothing item
router.delete("/:id", async (req, res) => {
  try {
    const item = await ClothingItem.findOne({ _id: req.params.id, user: req.userId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();

    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item", error: error.message });
  }
});

module.exports = router;
