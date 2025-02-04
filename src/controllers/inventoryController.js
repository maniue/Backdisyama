
const inventoryService = require("../services/inventoryService");
const axios = require("axios");


async function getAllUsers(req, res) {
  try {
    const users = await inventoryService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers
};
