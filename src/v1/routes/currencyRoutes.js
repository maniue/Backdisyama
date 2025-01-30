const express = require('express');
const currencyController = require('../../controllers/currencyController');

const router = express.Router();

router.post('/', currencyController.createCurrency);
router.get('/currencies', currencyController.getAllCurrencies);
router.get('/:id', currencyController.getCurrencyById);
router.put('/:id', currencyController.updateCurrencyById);
router.delete('/:id', currencyController.deleteCurrency);

module.exports = router;
