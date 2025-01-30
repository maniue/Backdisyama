// services/clientService.js
const Client = require('../models/client');

class ClientService {
  static async createClient(clientData) {
    try {
      const newClient = new Client(clientData);
      await newClient.save();  // Guardamos el cliente en la base de datos
      return newClient;
    } catch (error) {
      throw new Error('Error creating client: ' + error.message);
    }
  }

   // Método para obtener todos los clientes
   static async getAllClients() {
    try {
      const clients = await Client.find();  // Recupera todos los clientes
      return clients;
    } catch (error) {
      throw new Error('Error fetching clients: ' + error.message);
    }
  }

  // Método para actualizar un cliente por su _id
  static async updateClientById(clientId, updatedData) {
    try {
      // Buscar el cliente por _id y actualizar sus datos
      const updatedClient = await Client.findByIdAndUpdate(clientId, updatedData, { new: true });
      
      if (!updatedClient) {
        throw new Error('Client not found');
      }

      return updatedClient;
    } catch (error) {
      throw new Error('Error updating client: ' + error.message);
    }
  }

    // Método para actualizar un cliente por su _id
    static async updateClient(req, res) {
        const clientId = req.params.id;  // _id del cliente de la URL
        const updatedData = req.body;    // Nuevos datos del cliente en el body de la solicitud
    
        try {
          const updatedClient = await ClientService.updateClientById(clientId, updatedData);
    
          return res.status(200).json({
            message: 'Client updated successfully',
            client: updatedClient
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }
      
       // Método para obtener un cliente por su _id
  static async getClientById(clientId) {
    try {
      const client = await Client.findById(clientId);  // Buscar cliente por _id

      if (!client) {
        throw new Error('Client not found');
      }

      return client;
    } catch (error) {
      throw new Error('Error fetching client: ' + error.message);
    }
  }
}


module.exports = ClientService;
