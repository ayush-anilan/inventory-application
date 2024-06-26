const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, maxLength: 300 },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  return `shop/categories/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
