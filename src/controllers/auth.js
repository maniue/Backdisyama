const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    res.json({ token, username: User.username, lastName: User.lastName });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
