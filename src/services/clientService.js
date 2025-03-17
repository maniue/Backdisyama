const Client = require("../models/client");

class ClientService {
  static async createClient(clientData) {
    try {
      const newClient = new Client(clientData);
      await newClient.save();
      return newClient;
    } catch (error) {
      throw new Error("Error creating client: " + error.message);
    }
  }
  static async getAllClients() {
    try {
      const clients = await Client.find();
      return clients;
    } catch (error) {
      throw new Error("Error fetching clients: " + error.message);
    }
  }

  static async updateClientById(clientId, updatedData) {
    try {
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        updatedData,
        { new: true }
      );

      if (!updatedClient) {
        throw new Error("Client not found");
      }

      return updatedClient;
    } catch (error) {
      throw new Error("Error updating client: " + error.message);
    }
  }

  static async updateClient(req, res) {
    const clientId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedClient = await ClientService.updateClientById(
        clientId,
        updatedData
      );

      return res.status(200).json({
        message: "Client updated successfully",
        client: updatedClient,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getClientById(clientId) {
    try {
      const client = await Client.findById(clientId);

      if (!client) {
        throw new Error("Client not found");
      }

      return client;
    } catch (error) {
      throw new Error("Error fetching client: " + error.message);
    }
  }
  static async deleteClientById(clientId) {
    try {
      const deletedClient = await Client.findByIdAndDelete(clientId);

      if (!deletedClient) {
        throw new Error("Client not found");
      }

      return deletedClient;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ClientService;
