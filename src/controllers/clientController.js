const ClientService = require("../services/clientService");

class ClientController {
  static async createClient(req, res) {
    const {
      representativeFirstName,
      representativeLastName,
      companyName,
      email,
      phoneNumber,
      mobileNumber,
      clientType,
      location,
      rtn,
    } = req.body;

    if (
      !representativeFirstName ||
      !representativeLastName ||
      !companyName ||
      !email ||
      !phoneNumber ||
      !mobileNumber ||
      !clientType ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const clientData = {
        representativeFirstName,
        representativeLastName,
        companyName,
        email,
        phoneNumber,
        mobileNumber,
        clientType,
        rtn,
        location,
      };

      const newClient = await ClientService.createClient(clientData);

      return res.status(201).json({
        message: "Client created successfully",
        client: newClient,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getClients(req, res) {
    try {
      const clients = await ClientService.getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: error.message });
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

  static async getClientById(req, res) {
    const clientId = req.params.id;

    try {
      const client = await ClientService.getClientById(clientId);

      return res.status(200).json({
        message: "Client fetched successfully",
        client: client,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async deleteClient(req, res) {
    const clientId = req.params.id;

    try {
      const deletedClient = await ClientService.deleteClientById(clientId);

      return res.status(200).json({
        message: "Client deleted successfully",
        client: deletedClient,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ClientController;
