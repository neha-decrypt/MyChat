const { Chat } = require("../models/chat.model");
const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const ChatControllers = {}

ChatControllers.sendMessage = async (req, res) => {
    try {
        let from = req.id
        let to = req.body.to
        let message = req.body.message
        const { io } = require("./../index.js");
        let chatObj = new Chat({
            from, to, message
        })
        await chatObj.save()
        io.emit("sendMessage", from, to, message)
        return res.status(200).json({ statusCode: 200, message: "Message Sent Successfully" });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

module.exports = { ChatControllers }