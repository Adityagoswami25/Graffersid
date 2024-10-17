const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
