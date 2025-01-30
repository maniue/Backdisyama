// services/categoryService.js
const Category = require('../models/category');

// Función para crear una nueva categoría
const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

// Función para obtener todas las categorías
const getAllCategories = async () => {
  return await Category.find();
};

// Función para obtener una categoría por ID
const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId);
};

// Función para actualizar una categoría por ID
const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

// Función para eliminar una categoría por ID
const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
