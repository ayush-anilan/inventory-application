const express = require("express");
const router = express.Router();

// Require controller models
const category_controller = require("../controllers/categoryController");
const items_controller = require("../controllers/itemsController");

// GET Homepage
router.get("/", category_controller.index);

// category routes
router.get("/categories", category_controller.category_list);
router.get("/categories/create", category_controller.category_create_get);
router.post("/categories/create", category_controller.category_create_post);

// Items routes
router.get("/items", items_controller.items_list);
router.get("/items/create", items_controller.item_create_get);
router.post("/items/create", items_controller.item_create_post);

module.exports = router;
