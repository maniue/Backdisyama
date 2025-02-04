const Category = require("../models/category");

const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, {
    new: true,
  });
};

const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
