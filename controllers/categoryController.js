const { body, validationResult } = require("express-validator");
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

// GET request for one category
exports.category_detail = asyncHandler(async (req, res, next) => {
  // Get details of categories and all their items
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Items.find({ category: req.params.id }, "name description url").exec(),
  ]);
  res.render("category_detail", {
    title: "Category",
    category: category,
    items: allItemsByCategory,
  });
});

// Display list of all categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description url").sort({
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

// Handle category create on POST
exports.category_create_post = [
  async (req, res, next) => {
    const name = req.body.category_name;
    const description = req.body.category_description;
    await Category.create({ name: name, description: description });
    const data = await Category.find({}, "name description");
    res.render("category_list", {
      title: "Category List",
      category_list: data,
    });
  },
];

// Display category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of categories and all their items
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Items.find({ category: req.params.id }, "name description url").exec(),
  ]);

  if (category === null) {
    res.redirect("/shop/categories");
  }

  res.render("category_delete", {
    title: "Delete category",
    category: category,
    items: allItemsByCategory,
  });
});

// handle category delete on post
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Items.find({ category: req.params.id }, "name description url").exec(),
  ]);

  if (allItemsByCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete category",
      category: category,
      items: allItemsByCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/shop/categories");
  }
});
