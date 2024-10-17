const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.post("/:companyId", async (req, res) => {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;
    const review = new Review({
      companyId: req.params.companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:companyId", async (req, res) => {
  try {
    const reviews = await Review.find({ companyId: req.params.companyId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
