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

/*const forgotPassword = async (req, res) => {
  try {
    const { userID, newPassword } = req.body;

    // Find the user by userID
    const user = await User.findOne({ userID });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.password = newPassword;

    // Save the updated user
    await user.save();

    // Send a success response
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
const getUserDetails = (req, res) => {
  res.send(userAuthCheck);
};

module.exports = {
  loginUser,
  getUserDetails,
  //forgotPassword,
};
