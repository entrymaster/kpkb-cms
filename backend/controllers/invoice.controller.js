const Invoice = require("../models/invoice.model");
const Customer = require("../models/customer.model");
const { PDFDocument, rgb } = require('pdf-lib');

// Add Post

const addInvoice = async (req, res) => {
  // console.log("req: ", req.body);
  
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

  addInvoice.save()
    .then(async(result) => {
      const newInvoiceId = result._id;
      console.log(newInvoiceId);
      const savedInvoice = await Invoice.findById(newInvoiceId);
      console.log(savedInvoice);
      // const newCustomer = new Customer({
      //   userID: 'user',
      //   name: savedInvoice.customerName,
      //   phoneNo: savedInvoice.phoneNo,
      //   email: savedInvoice.customerEmail,
      //   creditAmount: 0,
      //   invoiceList: [savedInvoice._id], // Create a new array with the new invoice _id
      // });
      // const savedCustomer = await newCustomer.save();
      // console.log(savedCustomer);

      // Check if customer exists
      const existingCustomer = await Customer.findOne({ email: savedInvoice.customerEmail,});

      if (existingCustomer) {
        // Update existing customer document
        existingCustomer.invoiceList.push(savedInvoice._id); // Add new invoice _id to the customer's invoices array
        const savedCustomer = await existingCustomer.save();
        console.log(savedCustomer);
      } else {
        // Create a new customer document
        const newCustomer = new Customer({
          userID: 'user',
          name: result.customerName,
          phoneNo: result.phoneNo,
          email: result.customerEmail,
          creditAmount: 0,
          invoiceList: [savedInvoice._id], // Create a new array with the new invoice _id
        });
        // console.log(newCustomer);
        const savedCustomer = await newCustomer.save();
        console.log(savedCustomer);
      }

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
const getAllInvoice = async (req, res) => {
  const findAllInvoices = await Invoice.find({
    // userID: req.params.userId,

    userID: "user",
  }).sort({ customerName: 1 }); 
  // -1 for descending;1 for ascending;
  // console.log(req.params.userId);
  res.json(findAllInvoices);
  // console.log(findAllInvoices);
};
const searchInvoice = async (req, res) => {
 
  try {
    const {userID, customerName } = req.query;

    // Create a query object based on parameters
    const query = {
      userID: "user",
      // userID: req.params.userID,
      customerName: { $regex: new RegExp(customerName, 'i') }, // Case-insensitive string search
    };

    // Execute the query
    const records = await Invoice.find(query);
    // Send the results
    res.json(records);
    console.log(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const generatePDF = async (req, res) => {
//   const invoiceData=req.body;
//   const pdfDoc= await PDFDocument.create();
//   const page = pdfDoc.addPage([600, 400]);

// }

// const generatePDF= async (req, res) => {
//   try {
//     const { invoiceData} = req.body;
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage();
//     const { width, height } = page.getSize();
//     page.drawText("hello ");
//     page.drawText('Invoice Details:', { x: 50, y: height - 100, color: rgb(0, 0, 0) });
//     page.drawText(`Customer Name: ${invoiceData.customerName}`, { x: 50, y: height - 120, color: rgb(0, 0, 0) });
//     page.drawText(`Invoice ID: ${invoiceData.invoiceID}`, { x: 50, y: height - 120, color: rgb(0, 0, 0) });
//     page.drawText(`Total Amount: ${invoiceData.totalAmount}`, { x: 50, y: height - 140, color: rgb(0, 0, 0) });
//     const pdfBytes = await pdfDoc.save();
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');
//     res.send(pdfBytes);
//     // console.log(pdfBytes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// const fetchPDF= async (req, res) => {
//   res.sendFile(`${__dirname}/invoice.pdf`)
// }


module.exports={addInvoice, getInvoiceCount,getAllInvoice,searchInvoice };
