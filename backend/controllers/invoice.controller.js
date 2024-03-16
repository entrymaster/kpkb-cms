const Invoice = require("../models/invoice.model");
const Customer = require("../models/customer.model");
const { PDFDocument, rgb } = require('pdf-lib');

// Add Post

const addInvoice = async (req, res) => {
  console.log("req: ", req.body);
  let totalSales = 0;
  let totalCost = 0;
  for(let i = 0; i < req.body.itemList.length; i++){
    totalSales += req.body.itemList[i].quantity * req.body.itemList[i].rate;
    totalCost += req.body.itemList[i].quantity * req.body.itemList[i].costPrice;
  }
  // console.log(totalCost);
  // console.log(totalSales);
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
    totalSales: totalSales,
    totalCostPrice: totalCost
  });

  addInvoice.save()
    .then(async(result) => {
      const newInvoiceId = result._id;
      console.log(newInvoiceId);
      const savedInvoice = await Invoice.findById(newInvoiceId);
      console.log(savedInvoice);

      // Check if customer exists
      const existingCustomer = await Customer.findOne({ email: savedInvoice.customerEmail,});

      if (existingCustomer) {
        // Update existing customer document
        existingCustomer.invoiceList.push(savedInvoice._id); // Add new invoice _id to the customer's invoices array
        existingCustomer.creditAmount += (result.paymentMode === 'Credit' ? result.totalAmount : 0);
        const savedCustomer = await existingCustomer.save();
        console.log(savedCustomer);
      } else {
        // Create a new customer document
        const newCustomer = new Customer({
          //userID: 'user',
          userID: req.body.userID,
          name: result.customerName,
          phoneNo: result.phoneNo,
          email: result.customerEmail,
          creditAmount: (result.paymentMode === 'Credit' ? result.totalAmount : 0),
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
    userID: req.params.userId,

    // userID: "user",
  }).sort({ invoiceID: -1 }); 
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
      // userID: "user",
      userID: req.params.userId,
      customerName: { $regex: new RegExp(customerName, 'i') }, // Case-insensitive string search
    };

    // Execute the query
    const records = await Invoice.find(query).exec();
    // Send the results
    res.json(records);
    console.log(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getSalesData = async (req, res) => {
  const { userId, startDate, endDate } = req.query; // Extract userId, startDate, and endDate from query parameters
  try {
    // Convert startDate and endDate to ISO 8601 format
    //const userId = "user";
    const id = req.params.userId; 
    const isoStartDate = new Date(startDate).toISOString();
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of day
    const isoEndDate = endOfDay.toISOString();
    console.log(isoStartDate);
    console.log(isoEndDate);
    console.log(id);

    // Fetch sales data from database based on start date, end date, and userId
    const salesData = await Invoice.find({ 
      userID: id, // Filter by userId
      createdAt: { $gte: isoStartDate, $lte: isoEndDate } ,
    });
    // let totalPaidSales = 0;
    // let totalCreditSales = 0;
    // salesData.forEach((invoice) => {
    //   if(invoice.paymentMode==="Paid") totalPaidSales += invoice.totalSales;
    //   else totalCreditSales+= invoice.totalSales;
    // });
    // Send the salesData to the frontend
    //res.status(200).json(salesData, totalPaidSales, totalCreditSales);
    res.status(200).json(salesData,);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getDashboardData = async (req, res) => {
  try {
    // Extract user ID from request parameters or wherever it's stored
    const userId = req.params.userId; // Example: req.params.userId

    // Get today's date
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const startOfYesterday = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    console.log("today");
    console.log(today);
    console.log(startOfDay);
    console.log(startOfYesterday);
    // Find all invoices for the user with today's date
    const invoices = await Invoice.find({
      userID: userId,
      createdAt: { $gte: startOfDay }
    });
    const yesterdayInvoices = await Invoice.find({
      userID: userId,
      createdAt: { $gte: startOfYesterday, $lt: startOfDay }
    });
    console.log(invoices);
    // Calculate the sum of selling prices
    const totalSellingPrice = invoices.reduce((total, invoice) => total + invoice.totalSales, 0);
    // Calculate the sum of cost prices
    
    const totalCostPrice = invoices.reduce((total, invoice) => total + invoice.totalCostPrice, 0);
    const numberOfInvoices = invoices.length;
    const totalSellingPriceYesterday = yesterdayInvoices.reduce((total, invoice) => total + invoice.totalSales, 0);
    // Return the sums as response
    res.json({ totalSellingPrice, totalCostPrice, numberOfInvoices, totalSellingPriceYesterday });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports={addInvoice, getInvoiceCount,getAllInvoice,searchInvoice, getSalesData, getDashboardData };
