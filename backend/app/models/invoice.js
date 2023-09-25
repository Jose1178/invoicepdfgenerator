const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  items: [{ name: String, quantity: Number, price: Number }],
  dueDate: Date,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
