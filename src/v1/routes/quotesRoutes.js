const express = require('express');
const quoteController = require('../../controllers/quoteController')
const router = express.Router();

router.post('/', quoteController.createQuote);
router.get('/', quoteController.getAllQuotes);
router.get('/getQuoteById/:id', quoteController.getQuoteById);
router.put('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);
router.put('/:id/quotedRepuestos/:repuestoId', quoteController.updateQuotedRepuesto);
router.post('/:quoteId/addRepuesto', quoteController.addRepuestoIfNotExists);
router.delete('/:quoteId/quotedRepuesto/:quotedRepuestoId', quoteController.deleteQuotedRepuesto);
router.patch('/:quoteId/status', quoteController.updateQuoteStatus);
router.put('/update-discount/:quoteId', quoteController.updateDiscount);



module.exports = router;
