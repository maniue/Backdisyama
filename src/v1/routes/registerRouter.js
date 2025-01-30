const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, profileImage, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, firstName, lastName, password: hashedPassword, profileImage });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
