const User = require("../models/user.model");


// Add Post
const registerUser = async (req, res) => {
    const registerUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        gstno: req.body.gstno,
    });
  
    registerUser
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
      console.log("req: ", req.body);
  };

module.exports={registerUser};