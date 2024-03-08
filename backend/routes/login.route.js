const express = require("express");
const app = express();
const login = require("../controllers/login.controller");

app.post("/log",  login.loginUser);
app.get("/log" , login.getUserDetails);
module.exports = app;