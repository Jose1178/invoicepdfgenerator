const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  unitPrice: Number,
});

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  invoiceNumber: String,
  invoiceDate: Date,
  dueDate: Date,
  billingInfo: {
    yourBusinessInfo: String,
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

module.exports = mongoose.model('Invoice', invoiceSchema);


