const providerService = require("../services/providersService");

const createProvider = async (req, res) => {
  try {
    const { name, service, contact } = req.body;
    if (!name || !service || !contact) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newProvider = await providerService.createProvider({
      name,
      service,
      contact,
    });
    res
      .status(201)
      .json({
        message: "Provider created successfully",
        provider: newProvider,
      });
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProviders = async (req, res) => {
  try {
    const providers = await providerService.getAllProviders();
    res.status(200).json({ providers });
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, service, contact } = req.body;

    const updatedProvider = await providerService.updateProvider(id, {
      name,
      service,
      contact,
    });
    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res
      .status(200)
      .json({
        message: "Provider updated successfully",
        provider: updatedProvider,
      });
  } catch (error) {
    console.error("Error updating provider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProvider = await providerService.deleteProvider(id);
    if (!deletedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProvider,
  getProviders,
  updateProvider,
  deleteProvider,
};
