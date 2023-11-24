const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const UserControllers = {}
const tokenBlacklist = new Set();


UserControllers.login = async (req, res) => {
    const { email, password } = req.body;


    if (!email) {
        return res.status(400).json({ statusCode: 400, message: "Bad Params (Email Required)" })
    }
    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
        try {
            if (!password) {
                return res.status(400).json({ statusCode: 400, message: "Bad Params (Password Required)" })
            }
            // Create a new user
            const newUser = new User({ email, password });
            await newUser.save();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
        }
    }

    // Create and send a JWT token
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });
    return res.status(200).json({ statusCode: 200, data: { token: token }, message: "User Logged in Successfully" });
}

UserControllers.logout = async (req, res) => {
    try {
        const token = req.cookies.authToken
        if (token) {
            tokenBlacklist.add(token);
            res.clearCookie('authToken', { sameSite: 'none', secure: true });
        }
        return res.status(200).json({ statusCode: 200, message: "User Logged out Successfully" });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

UserControllers.userInfo = async (req, res) => {
    try {
        let { email } = req.params
        email = decodeURIComponent(email);
        let user = await User.find({ email: email }, { password: 0 })
        if (user.length > 0) {

            return res.status(200).json({ statusCode: 200, data: { user: user[0] }, message: "User Data Fetched Successfully" })
        }
        else {
            return res.status(404).json({ statusCode: 404, message: "User Data Not Found" })
        }

    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

UserControllers.getProfile = async (req, res) => {
    try {
        let { email } = req
        let user = await User.find({ email: email }, { password: 0 })
        if (user.length > 0) {

            return res.status(200).json({ statusCode: 200, data: { user: user[0] }, message: "User Data Fetched Successfully" })
        }
        else {
            return res.status(404).json({ statusCode: 404, message: "User Data Not Found" })
        }

    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

module.exports = { UserControllers }