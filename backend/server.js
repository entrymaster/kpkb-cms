const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const { PDFDocument,rgb } = require('pdf-lib');
const pdf = require('html-pdf');
const pdfTemplate = require('./utils/pdfTemplate');

const inventoryRouter = require("./routes/inventory.route");
const invoiceRouter = require("./routes/invoice.route");
const pendingTransactionsRouter = require("./routes/pendingTransactions.route");
const { updateSearchIndex } = require("./models/invoice.model");
const registerRouter = require("./routes/register.route")
const loginRouter = require("./routes/login.route")
const verifyRouter = require("./routes/verify.route")
const forgotRouter = require("./routes/forgot.route")
const userRouter = require("./routes/user.route")
//const {User} = require("./models/user.model")
// const registerRouter = require("./routes/register.route");

const app = express();

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

    /* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/inventory", inventoryRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/pendingTransactions",pendingTransactionsRouter);
app.use("/api/register" , registerRouter);
app.use("/api/login" , loginRouter);
app.use("/api/otp" , verifyRouter);
app.use("/api/forgot" , forgotRouter);
app.use("/api/user", userRouter);


// Middleware to parse JSON bodies
app.use(express.json());

// >>>>>>> 3b56fa5a78702810ae8dea8d7d64abdafcb1ee3b
/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/api/login", (req, res) => {
  res.send("Hello World!");
});

app.post('/api/generate-pdf', (req, res) => {
  // Generate PDF in memory
  pdf.create(pdfTemplate(req.body), {childProcessOptions: {
    env: {
      OPENSSL_CONF: '/dev/null',
    },
  }}).toBuffer((err, buffer) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).send('Error generating PDF');
    }

    // Send the PDF buffer back in the response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });
    res.send(buffer);
  });
});

// app.post('/api/create-pdf', (req,res) => {
//   pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
//     if(err) {
//       return console.log('error');
//     }
//   res.send(Promise.resolve())
//   });
//   console.log(req.body);
// })

// app.get('/api/fetch-pdf', (req,res) => {
//   res.sendFile(`${__dirname}/invoice.pdf`);
//   console.log("pdf check2")
//   console.log(res.body);
// })

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