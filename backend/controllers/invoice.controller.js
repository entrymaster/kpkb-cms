const Invoice = require("../models/invoice.model");

// Add Post
const addInvoice = async (req, res) => {
    console.log("req: ", req.body.userId);
    const addInvoice = new Invoice({
      userID: req.body.userID,
      invoiceID: req.body.invoiceID,
      customerName: req.body.customerName,
      phoneNo: req.body.phoneNo,
      customerEmail: req.body.customerEmail,
      totalAmount: req.body.totalAmount,
      notes: req.body.notes,
      paymentMode: req.body.paymentMode,
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

module.exports={addInvoice};