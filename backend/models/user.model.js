const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* Creating a new schema for the user model. */
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,   
    },
    firmName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    GSTNo: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    firmAddress: {
        type: String,
        required: true,
    },
    settings: {
        type: { userNotiPref: Boolean, custNotiPref: Boolean },
        required: true,
    },
    stats: {
        type: { todaySales: Number, yestSales: Number, todayProfit: Number, todayCust: Number, currDateTime: Date },
        required: true,
    },
    // profilePhoto: {
    //     type: Buffer/String,
    //     required: true,
    // },
});

module.exports = mongoose.model("User", userSchema);