const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const inventoryRouter = require("./routes/inventory.route");
const invoiceRouter = require("./routes/invoice.route");
const { updateSearchIndex } = require("./models/invoice.model");
const registerRouter = require("./routes/register.route")
const loginRouter = require("./routes/login.route")
//const {User} = require("./models/user.model")
// const registerRouter = require("./routes/register.route");
const app = express();

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

    /* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());
app.use(cors());
app.use("/api/inventory", inventoryRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/register" , registerRouter);
app.use("/api/login" , loginRouter);




/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Hello World!");
});



/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port :" + PORT));
  })
  .catch((err) => {
    console.log(err);
  });

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });