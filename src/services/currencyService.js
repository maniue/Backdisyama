const Currency = require('../models/currency');

const createCurrencyValue = async (name, value) => {
  const currency = new Currency({ name, value });
  await currency.save();
  return currency;
};

const getCurrencyValues = async () => {
  return await Currency.find({});
};

const getCurrencyById = async (id) => {
  const currency = await Currency.findById(id);
  if (!currency) {
    throw new Error('Currency not found');
  }
  return currency;
};

const updateCurrencyValue = async (id, name, newValue) => {
  const currency = await Currency.findByIdAndUpdate(
    id, 
    { name, value: newValue }, 
    { new: true, runValidators: true }
  );
  if (!currency) {
    throw new Error('Currency not found');
  }
  return currency;
};

const deleteCurrencyValue = async (id) => {
  const currency = await Currency.findByIdAndDelete(id);
  if (!currency) {
    throw new Error('Currency not found');
  }
  return currency;
};

module.exports = {
  createCurrencyValue,
  getCurrencyValues,
  getCurrencyById,
  updateCurrencyValue,
  deleteCurrencyValue,
};
