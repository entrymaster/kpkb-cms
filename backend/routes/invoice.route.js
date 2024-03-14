const express = require("express");
const app = express();
const invoice = require("../controllers/invoice.controller");

app.post("/add", invoice.addInvoice);
app.get("/count/:userID", invoice.getInvoiceCount);
app.get("/get/:userId", invoice.getAllInvoice);
//app.get("/get/:selectedMonth", invoice.getMonthData);
app.get("/search/:userId", invoice.searchInvoice);
app.get("/sales/:userId", invoice.getSalesData);

// app.post("/generate-pdf", invoice.generatePDF);
// app.get("/fetch-pdf", invoice.fetchPDF);
module.exports = app;
