const Invoice = require('../models/invoice');
const PDFDocument = require('pdfkit');

// Creating an invoice
exports.createInvoice = async (req, res) => {
    try {
      const {
        clientName,
        invoiceNumber,
        invoiceDate,
        dueDate,
        billingInfo,
        lineItems,
        taxes,
        discounts,
        shippingCosts,
        paymentInstructions,
        termsAndConditions,
        notes,
        subtotal,
        totalAmountDue,
      } = req.body;
  
      const invoice = new Invoice({
        clientName,
        invoiceNumber,
        invoiceDate,
        dueDate,
        billingInfo,
        lineItems,
        taxes,
        discounts,
        shippingCosts,
        paymentInstructions,
        termsAndConditions,
        notes,
        subtotal,
        totalAmountDue,
      });
  
      await invoice.save();
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: 'Error creating invoice', details: error.message });
    }
  };
// Generating a PDF invoice
exports.generatePDF = async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const doc = new PDFDocument();
    doc.pipe(res);

    // Set PDF metadata and response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=invoice_${invoice.invoiceNumber}.pdf`
    );

    // Add invoice data to the PDF 
    doc.fontSize(16).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.text(`Client: ${invoice.clientName}`);
    doc.moveDown();

    // Invoice Details Section
    doc.fontSize(14).text('Invoice Details');
    doc.font('Helvetica-Bold');
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Invoice Date: ${invoice.invoiceDate}`);
    doc.text(`Due Date: ${invoice.dueDate}`);
    doc.text(`Billing Name: ${invoice.billingInfo.businessInfo}`);
    doc.text(`Billing Address: ${invoice.billingInfo.customerInfo}`);
    doc.moveDown();

    // Line Items Section
    doc.fontSize(14).text('Line Items');
    doc.font('Helvetica-Bold');
    invoice.lineItems.forEach((item) => {
      doc.text(`- Description: ${item.description}`);
      doc.text(`  Quantity: ${item.quantity}`);
      doc.text(`  Unit Price: $${item.unitPrice}`);
      doc.moveDown();
    });

    // Total Section
    doc.fontSize(14).text('Total');
    doc.font('Helvetica-Bold');
    doc.text(`Subtotal: $${invoice.subtotal}`);
    doc.text(`Taxes: $${invoice.taxes}`);
    doc.text(`Discounts: $${invoice.discounts}`);
    doc.text(`Shipping Costs: $${invoice.shippingCosts}`);
    doc.text(`Total Amount Due: $${invoice.totalAmountDue}`);
    doc.moveDown();

    // Payment 
    doc.fontSize(14).text('Payment and Additional Information');
    doc.font('Helvetica-Bold');
    doc.text(`Payment Instructions: ${invoice.paymentInstructions}`);
    doc.text(`Terms and Conditions: ${invoice.termsAndConditions}`);
    doc.text(`Notes: ${invoice.notes}`);

    // End the PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF' });
  }
};
