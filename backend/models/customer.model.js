const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the customer model. */
const customerSchema = new Schema({
  userID: { // This is userID of the shopkeeper
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  creditAmount: {
    type: Number,
    required: false,
  },
  invoceList: {
    type: [ { invoiceID: String } ],
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);