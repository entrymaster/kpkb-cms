// authController.js
const User = require('../models/user.model'); // Assuming the User model is defined in this file

let userAuthCheck = null;

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getUserDetails = (req, res) => {
  res.send(userAuthCheck);
};

module.exports = {
  loginUser,
  getUserDetails,
};
