const express = require("express");
const app = express();
const login = require("../controllers/login.controller");

app.post("/log/in",  login.loginUser);
app.get("/log/get" , login.getUserDetails);
module.exports = app;