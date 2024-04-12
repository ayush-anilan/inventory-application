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
router.get("/categories/:id", category_controller.category_detail);
router.post("/categories/create", category_controller.category_create_post);
router.get("/categories/:id/delete", category_controller.category_delete_get);
router.post("/categories/:id/delete", category_controller.category_delete_post);

// Items routes
router.get("/items", items_controller.items_list);
router.get("/items/create", items_controller.item_create_get);
router.post("/items/create", items_controller.item_create_post);
router.get("/items/:id", items_controller.item_detail);
router.get("/items/:id/delete", items_controller.item_delete_get);
router.post("/items/:id/delete", items_controller.item_delete_post);
router.get("/items/:id/update", items_controller.item_update_get);
router.post("/items/:id/update", items_controller.item_update_post);

module.exports = router;
