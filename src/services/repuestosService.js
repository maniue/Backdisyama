const Repuesto = require("../models/repuestos");

const createRepuesto = async (repuestoData) => {
  const newRepuesto = new Repuesto(repuestoData);
  return await newRepuesto.save();
};
const getRepuestoByCode = async (code) => {
  try {
    return await Repuesto.findOne({ code });
  } catch (error) {
    throw new Error("Error buscando repuesto por código");
  }
};

const getRepuestoByDetails = async ({
  numOrden,
  category,
  nombreRepuesto,
  brand,
  fabricante,
}) => {
  return await Repuesto.findOne({
    numOrden,
    category,
    nombreRepuesto,
    brand,
    fabricante,
  });
};

const getAllRepuestos = async (filter = {}) => {
  try {
    const repuestos = await Repuesto.find(filter);
    return repuestos;
  } catch (error) {
    throw new Error("Error al obtener los repuestos: " + error.message);
  }
};

const getRepuestoById = async (id) => {
  return await Repuesto.findById(id);
};

const updateRepuesto = async (id, updatedData) => {
  return await Repuesto.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteRepuesto = async (id) => {
  return await Repuesto.findByIdAndDelete(id);
};

module.exports = {
  createRepuesto,
  getAllRepuestos,
  getRepuestoById,
  updateRepuesto,
  deleteRepuesto,
  getRepuestoByCode,
  getRepuestoByDetails,
};
