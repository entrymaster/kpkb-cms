const Customer = require("../models/customer.model");
const Supplier = require("../models/supplier.model");
const Invoice = require("../models/invoice.model");
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
    const { name, phoneNo, email } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate({_id:req.body._id},{name: name, phoneNo: phoneNo, email: email},{new: true});
    console.log(".....");
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
    const { name, phoneNo, email } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate({_id:req.body._id},{name: name, phoneNo: phoneNo, email: email},{new: true});

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
    console.log(req.params.userID);
  };

  const updateCustomerAmount = async (req, res) => {
    try {
     const updatedCust = await Customer.findByIdAndUpdate({ _id: req.body._id},{ $inc : {creditAmount: req.body.amount}},{new:true});
     const id=updatedCust.userID;
     console.log(updatedCust);
     res.json(updatedCust);
     const count = await Invoice.countDocuments({userID : id});
     const addInvoice = new Invoice({
       userID: updatedCust.userID,
       //invoiceID: req.body.invoiceID,
       invoiceID: count,
       customerName: updatedCust.name,
       phoneNo: updatedCust.phoneNo,
       customerEmail: updatedCust.email,
       totalAmount: -req.body.amount,
       //notes: req.body.notes,
       paymentMode: "Credit dues cleared",
       itemList: [],
       //createdAt: req.body.createdAt,
     });
     addInvoice.save()
     .then(async(result)=> {
       const newInvoiceId = result._id;
       updatedCust.invoiceList.push(newInvoiceId); // Add new invoice _id to the customer's invoices array
       const savedCustomer = await updatedCust.save();
       console.log(savedCustomer);
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
