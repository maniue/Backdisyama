const express = require('express')
const router = express.Router();
const inventoryController = require("../../controllers/inventoryController");
const providersController = require("../../controllers/providersController");

const User = require('../../models/User')
const Provider = require('../../models/providers')
const bcrypt = require('bcrypt')



router
    .get('/getAllUsers', inventoryController.getAllUsers)
    .post('/createProvider', providersController.createProvider)
    .get('/getAllProviders', providersController.getProviders)
    .post('/register', async (req, res) => {
      const { username, password, profileImage, firstName, lastName } = req.body;
      try {
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
          return res.status(409).json({ message: 'El usuario ya existe' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, profileImage, firstName, lastName });
        await newUser.save();
    
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error del servidor' });
      }
    });


    
module.exports = router;
