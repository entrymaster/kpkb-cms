const User = require("../models/user.model");

const getUserData = async (req, res) => {
    try {
        const userID = req.params.userID;
        const userData = await User.findById(userID);
        res.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Error fetching user data" });
    }
};

module.exports={getUserData};