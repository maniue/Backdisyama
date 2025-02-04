const categoryService = require("../services/categoryService");

const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const category = await categoryService.createCategory(categoryData);
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryService.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      categoryData
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await categoryService.deleteCategory(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
