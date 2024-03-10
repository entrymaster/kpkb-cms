const Invoice = require("../models/invoice.model");
const Customer = require("../models/customer.model");
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

const generatePDF = async (req, res) => {
  const invoiceData=req.body;
  const pdfDoc= await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

}

module.exports={addInvoice, getInvoiceCount};
