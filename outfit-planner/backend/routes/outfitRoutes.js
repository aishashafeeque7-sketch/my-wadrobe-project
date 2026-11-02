// This route creates outfit ideas by mixing and matching
// the user's own wardrobe items. It is simple, rule-based logic
// (no AI) so it is easy to understand as a beginner.

const express = require("express");
const ClothingItem = require("../models/ClothingItem");
const protect = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// This is our simple "color matching" chart.
// For each color, we list other colors that usually look good with it.
// Feel free to add more colors later!
const colorMatches = {
  black: ["white", "beige", "grey", "blue", "red", "pink", "gold"],
  white: ["black", "blue", "beige", "brown", "green", "red"],
  beige: ["black", "brown", "white", "blue", "green"],
  brown: ["beige", "white", "blue", "green", "orange"],
  blue: ["white", "beige", "black", "brown", "grey"],
  grey: ["black", "white", "blue", "pink", "red"],
  green: ["white", "beige", "brown", "black"],
  red: ["black", "white", "grey", "beige"],
  pink: ["white", "black", "grey", "blue"],
  yellow: ["white", "black", "blue", "grey"],
  orange: ["white", "black", "brown", "beige"],
  gold: ["black", "white", "beige"],
};

// This function checks if two colors go well together
function doColorsMatch(colorA, colorB) {
  if (colorA === colorB) return true; // same color always "matches" (monochrome look)
  const matchesForA = colorMatches[colorA] || [];
  return matchesForA.includes(colorB);
}

// @route   GET /api/outfits/suggest?occasion=Party
// @desc    Build outfit suggestions from the user's wardrobe for one occasion
router.get("/suggest", async (req, res) => {
  try {
    const { occasion } = req.query;

    if (!occasion) {
      return res.status(400).json({ message: "Please choose an occasion" });
    }

    // Get every item this user owns that fits the chosen occasion
    const items = await ClothingItem.find({ user: req.userId, occasion });

    // Split the items into groups by category, this makes it
    // much easier to mix and match them below
    const tops = items.filter((item) => item.category === "Top");
    const bottoms = items.filter((item) => item.category === "Bottom");
    const dresses = items.filter((item) => item.category === "Dress");
    const shoes = items.filter((item) => item.category === "Shoes");
    const bags = items.filter((item) => item.category === "Bag");
    const accessories = items.filter((item) => item.category === "Accessory");

    const outfits = [];

    // Helper that picks the first shoe/bag/accessory available
    // (keeps things simple - a beginner version does not need to be fancy)
    const pickExtra = (list) => (list.length > 0 ? list[0] : null);

    // OPTION 1: Build outfits using a Top + Bottom combo
    tops.forEach((top) => {
      bottoms.forEach((bottom) => {
        if (doColorsMatch(top.color, bottom.color)) {
          outfits.push({
            top,
            bottom,
            shoes: pickExtra(shoes),
            bag: pickExtra(bags),
            accessory: pickExtra(accessories),
          });
        }
      });
    });

    // OPTION 2: Build outfits using just a Dress (no top/bottom needed)
    dresses.forEach((dress) => {
      outfits.push({
        dress,
        shoes: pickExtra(shoes),
        bag: pickExtra(bags),
        accessory: pickExtra(accessories),
      });
    });

    res.status(200).json({
      occasion,
      totalItemsFound: items.length,
      outfits,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not build outfit ideas", error: error.message });
  }
});

module.exports = router;
