const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");
const PDFDocument = require("pdfkit");

// Create an invoice
router.post("/create", async (req, res) => {
  try {
    const { clientName, items, dueDate } = req.body;
    const invoice = new Invoice({ clientName, items, dueDate });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Error creating invoice" });
  }
});

// Generate a PDF invoice
router.get("/pdf/:invoiceId", async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const doc = new PDFDocument();
    doc.pipe(res);

    // Add invoice data to the PDF
    doc.fontSize(16).text("Invoice", { align: "center" });
    doc.text(`Client: ${invoice.clientName}`);
    doc.text("Items:");
    invoice.items.forEach((item) => {
      doc.text(`- ${item.name}: ${item.quantity} x $${item.price}`);
    });
    doc.text(`Due Date: ${invoice.dueDate}`);

    // End the PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF" });
  }
});

module.exports = router;
