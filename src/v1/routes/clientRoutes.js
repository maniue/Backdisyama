// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const ClientController = require('../../controllers/clientController');

// Endpoint para crear un cliente
router
.post('/createClient', ClientController.createClient)
.get('/getAllClients', ClientController.getClients)
.put('/:id', ClientController.updateClient)
.get('/:id', ClientController.getClientById)

module.exports = router;
