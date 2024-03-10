const Invoice = require("../models/invoice.model");
const { PDFDocument, rgb } = require('pdf-lib');

// Add Post

const addInvoice = async (req, res) => {
  console.log("req: ", req.body);
  
  const addInvoice = new Invoice({
    userID: req.body.userID,
    invoiceID: req.body.invoiceID,
    customerName: req.body.customerName,
    phoneNo: req.body.phoneNo,
    customerEmail: req.body.customerEmail,
    totalAmount: req.body.totalAmount,
    notes: req.body.notes,
    paymentMode: req.body.paymentMode,
    discount: req.body.discount,
    itemList: req.body.itemList,
    createdAt: req.body.createdAt,
  });

  addInvoice
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

const getInvoiceCount = async (req, res) => {
  // console.log("req: ", req.body);
  try{
    const userID = req.params.userID;
    const count = await Invoice.countDocuments({userID : userID});
    res.json({count});
  }
  catch(error){
    console.error("Error fetching invoice count:", error);
    res.status(500).json({ error: "Error fetching invoice count" });
  }
};

// const generatePDF = async (req, res) => {
//   const invoiceData=req.body;
//   const pdfDoc= await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);

// }

const generatePDF= async (req, res) => {
  try {
    const { invoiceData} = req.body;
    console.log(invoiceData);
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    // page.drawText("hello ");
    page.drawText('Invoice Details:', { x: 50, y: height - 100, color: rgb(0, 0, 0) });
    page.drawText(`Customer Name: ${invoiceData.customerName}`, { x: 50, y: height - 120, color: rgb(0, 0, 0) });
    page.drawText(`Invoice ID: ${invoiceData.invoiceID}`, { x: 50, y: height - 120, color: rgb(0, 0, 0) });
    page.drawText(`Total Amount: ${invoiceData.totalAmount}`, { x: 50, y: height - 140, color: rgb(0, 0, 0) });
    const pdfBytes = await pdfDoc.save();

    // Send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');
    res.send(pdfBytes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports={addInvoice, getInvoiceCount, generatePDF};
