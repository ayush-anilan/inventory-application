const Items = require("../models/items");
const asyncHandler = require("express-async-handler");

// Display list of items
exports.items_list = asyncHandler(async (req, res, next) => {
  const allItems = await Items.find(
    {},
    "name description category price number_in_stock"
  );
  res.render("items_list", { title: "Items List", items_list: allItems });
});

// Handle item create on GET
exports.item_create_get = (req, res, next) => {
  res.render("item_form", { title: "Create Item" });
};
