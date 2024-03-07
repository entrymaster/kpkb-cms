const express = require("express");
const app = express();
const inventory = require("../controllers/inventory.controller");

app.post("/add", inventory.addProduct);
app.post("/update",inventory.updateProduct);
app.get("/get/:userID", inventory.getAllProducts);
app.get("/search/:userID/:itemName", inventory.searchProduct);
app.get("/delete/:userID", inventory.deleteProduct);
app.post("/addBatchList", inventory.addBatchList);
app.post("/updateBatchList", inventory.updateBatchList);
module.exports = app;