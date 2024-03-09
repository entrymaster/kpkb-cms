const express = require("express");
const app = express();
const pendingTrans = require("../controllers/pendingTransactions.controller");

app.post("/addNewCredit",pendingTrans.addNewCredit);
app.post("/addNewDebit",pendingTrans.addNewDebit);
app.put("/updateCustomer",pendingTrans.updateCustomer);
app.put("/updateSupplier",pendingTrans.updateSupplier)
module.exports = app;