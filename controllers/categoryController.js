const Category = require("../models/categories");
const Items = require("../models/items");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numItems] = await Promise.all([
    Category.countDocuments({}).exec(),
    Items.countDocuments({}).exec(),
  ]);
  res.render("pages/index", {
    title: "Express",
    category_count: numCategories,
    items_count: numItems,
  });
});

// Display list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description").sort({
    name: 1,
  });
  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

// Handle category create on GET
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};
