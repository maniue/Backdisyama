const express = require('express');
const router = express.Router();
const repuestosController = require('../../controllers/repuestosController');

// Crear un nuevo repuesto
router
.post('/createRepuesto', repuestosController.createRepuesto)

// Obtener todos los repuestos
.get('/', repuestosController.getAllRepuestos)
// Obtener un repuesto por ID
.get('/:id', repuestosController.getRepuestoById)
// Actualizar un repuesto
// Eliminar un repuest
.delete('/:id', repuestosController.deleteRepuesto)

.put('/:id', repuestosController.updateRepuesto)
module.exports = router;
