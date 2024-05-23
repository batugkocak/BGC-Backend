const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: 500,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "home", "other"],
      default: "other",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
