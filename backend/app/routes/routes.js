const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice');

// Route for creating an invoice
router.post('/create', invoiceController.createInvoice);

// Route for generating a PDF invoice
router.get('/pdf/:invoiceId', invoiceController.generatePDF);

module.exports = router;

