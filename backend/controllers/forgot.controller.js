const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const changeUser = async (req, res) => {
    const { email, password } = req.body;
    //console.r
    try {
        // Check if user with provided email exists
        const user = await User.findOne({ email });
        if (!user) {
            alert('User not found')
            return res.status(404).json({ message: 'User not found' });

        }
        //console.log(email)
        //console.log(newPassword)
        // Hash the new password
        //const hashedPassword = await bcrypt.hash(newPassword,10);

        // Update user's password
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports={changeUser};