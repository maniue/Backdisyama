// services/providerService.js
const Provider = require("../models/providers")

// Crear un nuevo proveedor
const createProvider = async (providerData) => {
  const provider = new Provider(providerData);
  return await provider.save();
};
const getAllProviders = async () => {
  return await Provider.find().sort({ createdAt: -1 }); // Ordenar por fecha de creación, descendente
};
const updateProvider = async (id, providerData) => {
  return await Provider.findByIdAndUpdate(id, providerData, { new: true });
};

const deleteProvider = async (id) => {
  return await Provider.findByIdAndDelete(id);
};


module.exports = {
  createProvider,
  getAllProviders,
  updateProvider,
  deleteProvider,
};
