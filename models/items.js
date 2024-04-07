const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
  description: { type: String, required: true, maxLength: 300 },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

// Virutal for item's URL
ItemSchema.virtual("url").get(function () {
  return `catalog/items/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
