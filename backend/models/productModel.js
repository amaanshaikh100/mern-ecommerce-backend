const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title."],
    },
    description: {
      type: String,
      required: [true, "A product must have a description."],
    },
    images: [Array],
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 50,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price."],
      min: [0, "Price must be above 0"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 10,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
