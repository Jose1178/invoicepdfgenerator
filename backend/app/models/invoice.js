const mongoose = require('mongoose');

// Defining the schema for individual line items on the invoice
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  unitPrice: Number,
});

// Defining the schema for the entire invoice, including line items
const invoiceSchema = new mongoose.Schema({
  clientName: String,
  invoiceNumber: String,
  invoiceDate: Date,
  dueDate: Date,
  billingInfo: {
    businessInfo: String,
    customerInfo: String,
  },
  lineItems: [itemSchema],
  taxes: Number,
  discounts: Number,
  shippingCosts: Number,
  paymentInstructions: String,
  termsAndConditions: String,
  notes: String,
  subtotal: Number,
  totalAmountDue: Number,
});

// Creating a model named 'Invoice' based on the 'invoiceSchema'
module.exports = mongoose.model('Invoice', invoiceSchema);


