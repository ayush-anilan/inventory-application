const Items = require("../models/items");
const Categories = require("../models/categories");
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
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Categories.find({}, "name");
  res.render("item_form", { title: "Create Item", categories: categories });
});

// Handle item create on POST
exports.item_create_post = [
  async (req, res, next) => {
    const itemName = req.body.item_name;
    const description = req.body.item_description;
    const category = req.body.category;
    const itemPrice = req.body.item_price;
    const itemStock = req.body.item_stock;
    await Items.create({
      name: itemName,
      description: description,
      category: category,
      price: itemPrice,
      number_in_stock: itemStock,
    });
    const data = await Items.find(
      {},
      "name description category price number_in_stock"
    );
    res.render("items_list", { title: "Items List", items_list: data });
  },
];
