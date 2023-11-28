const { mongoose } = require("mongoose");
const { Chat } = require("../models/chat.model");
const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const { getOnlineUsers } = require("../utils/state");
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
        let onlineUsers = getOnlineUsers()
        console.log("onlineUsers[to]", onlineUsers)

        let chatRes = await chatObj.save()
        if (onlineUsers[to]) {
            const { io } = require("./../index")
            io.to(onlineUsers[to]).emit('privateMessage', {
                message: `Private message Received`,
            });
            await Chat.findByIdAndUpdate(chatRes?._id, { $set: { isDelivered: true } })
        }
        io.emit("sendMessage", from, to, message)
        return res.status(200).json({ statusCode: 200, message: "Message Sent Successfully" });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

ChatControllers.getMyMessages = async (req, res) => {
    try {
        let from = req.id
        let chats = await Chat.find({ $or: [{ from: from }, { to: from }] })
        console.log("chats", chats)
        return res.status(200).json({ statusCode: 200, data: chats, message: "Messages Fetched Successfully" });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

ChatControllers.getSingleMessageThread = async (req, res) => {
    try {
        let { anotherPerson } = req.query
        console.log("{ from: req.userId, to: anotherPerson }", { from: new mongoose.Types.ObjectId(req.id), to: new mongoose.Types.ObjectId(anotherPerson) })
        let chats = await Chat.find({ from: new mongoose.Types.ObjectId(req.id), to: new mongoose.Types.ObjectId(anotherPerson) })
        console.log("chats", chats)
        return res.status(200).json({ statusCode: 200, data: chats, message: "Messages Fetched Successfully" });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }
}

module.exports = { ChatControllers }