
const { all } = require('axios');
const user = require('../models/User.js')
    
    async function getAllUsers() {
        try {
          const users = await user.find();
          return users;
        } catch (error) {
          throw new Error('Error al obtener todos los usuarios');
        }
      }

module.exports = {
    getAllUsers
}
