const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the user model. */
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    // userID: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,   
    },
    password: {
        type: String,
        required: true,
    },
    gstno: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);