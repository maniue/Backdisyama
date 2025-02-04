const express = require('express');
const router = express.Router();
const repuestosController = require('../../controllers/repuestosController');

router
.post('/createRepuesto', repuestosController.createRepuesto)
.get('/', repuestosController.getAllRepuestos)
.get('/:id', repuestosController.getRepuestoById)
.delete('/:id', repuestosController.deleteRepuesto)
.put('/:id', repuestosController.updateRepuesto)
module.exports = router;
