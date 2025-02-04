const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");

router
  .post("/", categoryController.createCategory)
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getCategoryById)
  .put("/:id", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);

module.exports = router;
