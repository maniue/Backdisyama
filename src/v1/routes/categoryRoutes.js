// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');

// Crear una nueva categoría
router
.post('/', categoryController.createCategory)
// Obtener todas las categorías
.get('/', categoryController.getAllCategories)
// Obtener una categoría por ID
.get('/:id', categoryController.getCategoryById)
// Actualizar una categoría por ID
.put('/:id', categoryController.updateCategory)
// Eliminar una categoría por ID
.delete('/:id', categoryController.deleteCategory)

module.exports = router;
