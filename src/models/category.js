// models/categoryModel.js
const mongoose = require('mongoose');

// Definimos el esquema de la categoría
const categorySchema = new mongoose.Schema({
  nombreCategoria: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Creamos el modelo a partir del esquema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
