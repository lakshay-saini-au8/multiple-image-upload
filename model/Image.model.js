const mongoose = require("mongoose");

const imageSchmea = new mongoose.Schema({
  imageUrl: String,
});

module.exports = mongoose.model("Image", imageSchmea);
