const express = require("express");
const app = express();
const user = require("../controllers/user.controller");

app.get("/get/:userId",getUserData);
module.exports = app;