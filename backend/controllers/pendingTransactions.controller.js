const Customer = require("../models/customer.model");
const Supplier = require("../models/supplier.model");
const Invoice = require("../models/invoice.model");
const User = require("../models/user.model");
const notifyCustomerController = require("./notifyCustomer.controller");
const pdf = require('html-pdf');
const pdfTemplate = require('../utils/pdfTemplate');

const existingCustEmail = async(req,res) => {
  try{
    const user = req.params.userID;
    const {email} = req.query;
    const redundantEmail = await Customer.find({userID: user, email: email});
    console.log(redundantEmail); 
    res.json(redundantEmail);
    }
    catch (error) {
      console.error("Error finding customer with given email",error);
      res.status(400).json({ error: "Failed to find customer with given email"});
    }
}

const existingSuppEmail = async(req,res) => {
  try{
    const user = req.params.userID;
    const {email} = req.query;
    const redundantEmail = await Supplier.find({userID: user, email: email});
    console.log(redundantEmail); 
    res.json(redundantEmail);
    }
    catch (error) {
      console.error("Error finding supplier with given email",error);
      res.status(400).json({ error: "Failed to find supplier with given email"});
    }
}

//Add New Credit
const addNewCredit = async (req, res) => {
   try{
    const newCredit = new Customer({
      //userID: 'user',
      userID: req.body.userID,
      name: req.body.partyName,
      phoneNo: req.body.phoneNumber,
      email: req.body.email,
      creditAmount: req.body.amount,
    });

    const savedCredit = await newCredit.save();
    res.status(201).json(savedCredit);

    const id = savedCredit.userID;
    const count = await Invoice.countDocuments({userID : id});
     const addInvoice = new Invoice({
       userID: savedCredit.userID,
       //invoiceID: req.body.invoiceID,
       invoiceID: count,
       customerName: savedCredit.name,
       phoneNo: savedCredit.phoneNo,
       customerEmail: savedCredit.email,
       totalAmount: savedCredit.creditAmount,
       //notes: req.body.notes,
       paymentMode: "Amount added to credit",
       itemList: [],
       //createdAt: req.body.createdAt,
     });
     addInvoice.save()
     .then(async(result)=> {
       const newInvoiceId = result._id;
       savedCredit.invoiceList.push(newInvoiceId); // Add new invoice _id to the customer's invoices array
       const savedCustomer = await savedCredit.save();
       console.log(savedCustomer);
       const shopkeeper = await User.find({_id : savedCredit.userID});
       console.log(shopkeeper);
       pdf.create(pdfTemplate(
        {
          invoiceData: {
            userID: result.userID,
            invoiceID: result.invoiceID,
            customerName: result.customerName,
            phoneNo: result.phoneNo,
            customerEmail: result.customerEmail,
            totalAmount: result.totalAmount,
            notes:result.notes,
            paymentMode:result.paymentMode,
            discount: result.discount,
            itemList:result.itemList,
            createdAt: result.createdAt,
          },
          userData: {
            firstname: shopkeeper[0].firstname, 
            lastname: shopkeeper[0].lastname, 
            email: shopkeeper[0].email, 
            password: shopkeeper[0].password, 
            gstno: shopkeeper[0].gstno, 
            shopname: shopkeeper[0].shopname, 
            shopaddress: shopkeeper[0].shopaddress,
          },
        }
       ), {}).toFile(`${__dirname}\\invoice.pdf`, (err) => {
        if(err) {
          return console.log('error');
        }
        console.log("pdf saved successfully");
        const pdfPath = `${__dirname}\\invoice.pdf`;
        console.log(pdfPath);
        const body = `Rs. ${savedCustomer.creditAmount} was added to your total credit amount.`
        notifyCustomerController(savedCustomer.email, "Billing 360", shopkeeper[0].shopname, shopkeeper[0].email, shopkeeper[0].shopaddress, body, savedCustomer.creditAmount, pdfPath);
      })
     })
     .catch((err) => {
       console.log(err);
     });
  } catch (error) {
    console.error("Error adding new credit:", error);
    res.status(400).json({ error: "Failed to add credit" });
  }
};

// Add New Debit
const addNewDebit = async (req, res) => {
    try {
      const newDebit = new Supplier({
        //userID: 'user',
        userID: req.body.userID,
        name: req.body.partyName,
        phoneNo: req.body.phoneNumber,
        email: req.body.email,
        debitAmount: req.body.amount,
      });
      const savedDebit = await newDebit.save();
      res.status(201).json(savedDebit);
    } catch (error) {
      console.error("Error adding new debit:", error);
      res.status(400).json({ error: "Failed to add debit" });
    }
  };

// Update Existing Customer Credit
const updateCustomer  = async (req, res) => {
  try {
    const { phoneNo, email } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate({_id:req.body._id},{phoneNo: phoneNo, email: email},{new: true});
    console.log(updatedCustomer);
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating Customer:", error);
    res.status(400).json({ error: "Failed to update Customer" });
  }
};
 
// Update Existing Supplier Debit
const updateSupplier  = async (req, res) => {
  try {
    const {phoneNo, email } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate({_id:req.body._id},{phoneNo: phoneNo, email: email},{new: true});
    res.json(updatedSupplier);
  } catch (error) {
    console.error("Error updating Supplier:", error);
    res.status(400).json({ error: "Failed to update Supplier" });
  }
  };

  const getCreditCustomers = async (req, res) => {
    try{
    const CreditCustomers = await Customer.find({ creditAmount : {$gt : 0}, userID : req.params.userID}).sort({ creditAmountmount: -1});
    console.log(CreditCustomers); 
    res.json(CreditCustomers);
    }
    catch (error) {
      console.error("Error finding customers with credit:",error);
      res.status(400).json({ error: "Failed to find customers with credit"});
    }
  };

  const getDebitSuppliers = async (req, res) => {
    try{
    const DebitSuppliers = await Supplier.find({ debitAmount : {$gt : 0}, userID : req.params.userID}).sort({ debitAmount: -1 });
    console.log(DebitSuppliers); 
    res.json(DebitSuppliers);
    }
    catch (error) {
      console.error("Error finding suppliers to debit:",error);
      res.status(400).json({ error: "Failed to find suppliers to debit"});
    }
  };

  const updateCustomerAmount = async (req, res) => {
    try {
      const amt = req.body.amount;
     const updatedCust = await Customer.findByIdAndUpdate({ _id: req.body._id},{ $inc : {creditAmount: req.body.amount}},{new:true});
     const id=updatedCust.userID;
     console.log(updatedCust);
     res.json(updatedCust);
     const count = await Invoice.countDocuments({userID : id});
     const totalAmt = amt > 0 ? amt : -amt;
     const payMode = amt > 0 ? "Amount added to credit" : "Credit dues cleared";
     const addInvoice = new Invoice({
       userID: updatedCust.userID,
       //invoiceID: req.body.invoiceID,
       invoiceID: count,
       customerName: updatedCust.name,
       phoneNo: updatedCust.phoneNo,
       customerEmail: updatedCust.email,
       totalAmount: totalAmt,
       //notes: req.body.notes,
       paymentMode: payMode,
       itemList: [],
       //createdAt: req.body.createdAt,
     });
     addInvoice.save()
     .then(async(result)=> {
       const newInvoiceId = result._id;
       updatedCust.invoiceList.push(newInvoiceId); // Add new invoice _id to the customer's invoices array
       const savedCustomer = await updatedCust.save();
       console.log(savedCustomer);
       const shopkeeper = await User.find({_id : savedCustomer.userID});
       console.log(shopkeeper);
       pdf.create(pdfTemplate(
        {
          invoiceData: {
            userID: result.userID,
            invoiceID: result.invoiceID,
            customerName: result.customerName,
            phoneNo: result.phoneNo,
            customerEmail: result.customerEmail,
            totalAmount: result.totalAmount,
            notes:result.notes,
            paymentMode:result.paymentMode,
            discount: result.discount,
            itemList:result.itemList,
            createdAt: result.createdAt,
          },
          userData: {
            firstname: shopkeeper[0].firstname, 
            lastname: shopkeeper[0].lastname, 
            email: shopkeeper[0].email, 
            password: shopkeeper[0].password, 
            gstno: shopkeeper[0].gstno, 
            shopname: shopkeeper[0].shopname, 
            shopaddress: shopkeeper[0].shopaddress,
          },
        }
       ), {}).toFile(`${__dirname}\\invoice.pdf`, (err) => {
        if(err) {
          return console.log('error');
        }
        console.log("pdf saved successfully");
        const pdfPath = `${__dirname}\\invoice.pdf`;
        console.log(pdfPath);
        const body = result.paymentMode === "Amount added to credit" ? `Rs. ${result.totalAmount} was added to your total credit amount.` : `You have paid Rs. ${result.totalAmount}.`
        notifyCustomerController(savedCustomer.email, "Billing 360", shopkeeper[0].shopname, shopkeeper[0].email, shopkeeper[0].shopaddress, body, savedCustomer.creditAmount, pdfPath);
      })
     })
     .catch((err) => {
       console.log(err);
     });
    }
    catch(error) {
     console.error("Error updating customer amount", error);
     res.status(400).json({error: "Failed to update customer amount"});
    }

  };
 
  const updateSupplierAmount = async (req, res) => {
   try {
    const updatedSupp = await Supplier.findByIdAndUpdate({ _id: req.body._id},{$inc : {debitAmount: req.body.amount}},{new:true});
    console.log(updatedSupp);
    res.json(updatedSupp);
   }
   catch(error) {
    console.error("Error updating supplier amount", error);
    res.status(400).json({error: "Failed to update supplier amount"});
   }
 };

 const SearchCreditCustomers = async(req, res) => {
  try{
    const user= req.params.userID;
    const {custName} = req.query;
    const CreditCustomers = await Customer.find({ creditAmount : {$gt : 0}, userID : user, name: { $regex: new RegExp(custName, 'i') }});
    console.log(CreditCustomers); 
    res.json(CreditCustomers);
    }
    catch (error) {
      console.error("Error finding customers with credit:",error);
      res.status(400).json({ error: "Failed to find customers with credit"});
    }
 };

 const SearchDebitSuppliers = async(req, res) => {
  try{
    const user= req.params.userID;
    const {suppName} = req.query;
    const DebitSuppliers = await Supplier.find({ debitAmount : {$gt : 0}, userID : user, name: { $regex: new RegExp(suppName, 'i') }});
    console.log(DebitSuppliers); 
    res.json(DebitSuppliers);
    }
    catch (error) {
      console.error("Error finding suppliers to debit:",error);
      res.status(400).json({ error: "Failed to find suppliers to debit"});
    }
 };

module.exports={
  existingCustEmail,
  existingSuppEmail,
  addNewCredit,
  addNewDebit,
  updateCustomer ,
  updateSupplier,
  getCreditCustomers,
  getDebitSuppliers,
  updateCustomerAmount,
  updateSupplierAmount,
  SearchCreditCustomers,
  SearchDebitSuppliers,
};
