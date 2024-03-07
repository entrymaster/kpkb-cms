const express = require("express");
const app = express();
const pendingTrans = require("../controllers/pendingTransactions.controller");

app.post("/addNewCredit",addNewCredit);
app.post("/addNewDebit",addNewDebit);

module.exports = app;