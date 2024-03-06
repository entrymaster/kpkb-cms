const express = require("express");
const app = express();
const invoice = require("../controllers/invoice.controller");

app.post("/add", invoice.addInvoice);
module.exports = app;