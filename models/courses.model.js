const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name is required!!"],
      minlength: [2, "the name at least 2 characters!!"],
    },
    price: {
      type: Number,
      required: [true, "the price is required!!"],
      min: [0, "invalid the price must be positive number!!"],
    },
  }
);

module.exports = mongoose.model("Course", courseSchema);
