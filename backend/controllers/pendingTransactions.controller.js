const Customer = require("../models/customer.model");
const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");

//Add New Credit
const addNewCredit = async (req, res) => {
   try{
    const newCredit = new Customer({
      userID: 'user',
      name: req.body.partyName,
      phoneNo: req.body.phoneNumber,
      email: req.body.email,
      creditAmount: req.body.amount,
    });

    const savedCredit = await newCredit.save();
    res.status(201).json(savedCredit);
  } catch (error) {
    console.error("Error adding new credit:", error);
    res.status(400).json({ error: "Failed to add credit" });
  }
};

// Add New Debit
const addNewDebit = async (req, res) => {
    try {
      const newDebit = new Supplier({
        userID: 'user',
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
    const { CustomerID, invoiceID, amount } = req.body;

    // Find the Customer by userID
    const Customer = await Customer.findOne({ userID: CustomerID });

    if (!Customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Update credit amount
    Customer.creditAmount += amount ;

    // Add invoice ID to the invoice list (avoid duplicates)
    const uniqueInvoiceList = [...new Set([...Customer.invoiceList, { invoiceID }])]; // Ensures unique invoices
    Customer.invoiceList = uniqueInvoiceList;

    const updatedCustomer = await Customer.save();

    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating Customer credit:", error);
    res.status(400).json({ error: "Failed to update Customer credit" });
  }
};

  
// Update Existing Supplier Debit
const updateSupplier  = async (req, res) => {
    try {
      const { SupplierID, invoiceID, amount } = req.body;
  
      // Find the Supplier by userID
      const Supplier = await Supplier.findOne({ userID: SupplierID });
  
      if (!Supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
  
      // Update debit amount 
      Supplier.debitAmount += amount ;
  
      // Add invoice ID to the invoice list (avoid duplicates)
      const uniqueInvoiceList = [...new Set([...Supplier.invoiceList, { invoiceID }])]; // Ensures unique invoices
      Supplier.invoiceList = uniqueInvoiceList;
  
      const updatedSupplier = await Supplier.save();
  
      res.json(updatedSupplier);
    } catch (error) {
      console.error("Error updating Supplier debit:", error);
      res.status(400).json({ error: "Failed to update Supplier debit" });
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
    console.log(req.params.userID);
  };

  const updateCustomerAmount = async (req, res) => {
    try {
     const updatedCust = await Customer.findByIdAndUpdate({ _id: req.body._id},{ $inc : {creditAmount: req.body.amount}},{new:true});
     console.log(updatedCust);
     res.json(updatedCust);
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

module.exports={
  addNewCredit,
  addNewDebit,
  updateCustomer ,
  updateSupplier,
  getCreditCustomers,
  getDebitSuppliers,
  updateCustomerAmount,
  updateSupplierAmount,
};