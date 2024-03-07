const express = require("express");
const app = express();
const invoice = require("../controllers/invoice.controller");

app.post("/add", invoice.addInvoice);
app.get("/count/:userID", invoice.getInvoiceCount);
module.exports = app;