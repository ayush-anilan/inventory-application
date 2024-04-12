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

// GET request for one item
exports.item_detail = asyncHandler(async (req, res, next) => {
  const [items] = await Promise.all([Items.findById(req.params.id).exec()]);
  res.render("item_detail", {
    items: items,
  });
});

// Handle item create on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [item, categories] = await Promise.all([
    Items.find({}, "name description category price number_in_stock")
      .populate("category")
      .exec(),
    Categories.find({}, "name").exec(),
  ]);
  res.render("item_form", {
    title: "Create Item",
    categories: categories,
    item: item,
  });
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
    res.redirect("/shop/items");
  },
];

// Handle item delete on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const [items] = await Promise.all([Items.findById(req.params.id).exec()]);
  res.render("item_delete", {
    item: items,
  });
});

// Handle item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const [items] = await Promise.all([Items.findById(req.params.id).exec()]);
  await Items.findByIdAndDelete(req.body.itemid);
  res.redirect("/shop/items");
});

// Handle item update on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, categories] = await Promise.all([
    Items.findById(req.params.id).populate("category").exec(),
    Categories.find({}, "name").exec(),
  ]);

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_form", {
    title: "Update Item",
    categories: categories,
    item: item,
  });
});

// Handle item update on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  const itemName = req.body.item_name;
  const description = req.body.item_description;
  const category = req.body.item_category;
  const itemPrice = req.body.item_price;
  const itemStock = req.body.item_stock;
  const itemId = req.params.id;

  const item = new Items({
    name: itemName,
    description: description,
    category: category,
    price: itemPrice,
    number_in_stock: itemStock,
    _id: req.params.id,
  });

  await Items.findByIdAndUpdate(req.params.id, item, {});
  res.redirect("/shop/items");
});
