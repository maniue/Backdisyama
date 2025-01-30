const Brand = require('../models/brands');

const getAllBrands = async () => {
  return await Brand.find();
};

const getBrandById = async (id) => {
  return await Brand.findById(id);
};

const createBrand = async (data) => {
  const brand = new Brand(data);
  return await brand.save();
};

const updateBrand = async (id, data) => {
  data.updated_at = Date.now();
  return await Brand.findByIdAndUpdate(id, data, { new: true });
};

const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
