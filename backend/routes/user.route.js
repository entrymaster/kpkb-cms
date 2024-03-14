const express = require("express");
const app = express();
const user = require("../controllers/user.controller");

app.get("/get/:userId",user.getUserData);
module.exports = app;