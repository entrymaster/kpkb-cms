const express = require("express");
const app = express();
const inventory = require("../controllers/inventory.controller");

app.post("/add", inventory.addProduct);
module.exports = app;