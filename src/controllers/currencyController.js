const currencyService = require('../services/currencyService');

const createCurrency = async (req, res) => {
  const { name, value } = req.body;
  if (!name || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({ message: 'Invalid name or value provided' });
  }

  try {
    const currency = await currencyService.createCurrencyValue(name, value);
    res.status(201).json(currency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await currencyService.getCurrencyValues();
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrencyById = async (req, res) => {
  try {
    const currency = await currencyService.getCurrencyById(req.params.id);
    res.json(currency);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateCurrencyById = async (req, res) => {
  const { name, value } = req.body;
  if (!name || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({ message: 'Invalid name or value provided' });
  }

  try {
    const updatedCurrency = await currencyService.updateCurrencyValue(req.params.id, name, value);
    res.json(updatedCurrency);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteCurrency = async (req, res) => {
  try {
    const deletedCurrency = await currencyService.deleteCurrencyValue(req.params.id);
    res.json({ message: 'Currency deleted', deletedCurrency });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrencyById,
  deleteCurrency,
};
