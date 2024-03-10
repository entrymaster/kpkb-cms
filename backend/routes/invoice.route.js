const express = require("express");
const app = express();
const invoice = require("../controllers/invoice.controller");

app.post("/add", invoice.addInvoice);
app.get("/count/:userID", invoice.getInvoiceCount);
// app.post("/generate-pdf", invoice.generatePDF);
// app.get("/fetch-pdf", invoice.fetchPDF);
module.exports = app;
