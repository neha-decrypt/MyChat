const mongoose = require('mongoose');
// Define User schema
const chatSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.ObjectId, required: true },
    to: { type: mongoose.Schema.ObjectId, required: true },
    message: { type: String, required: true },
    sentAt: { type: String, required: true, default: Date.now() },
    isDelivered: { type: Boolean, required: true, default: false },
    isRead: { type: Boolean, required: true, default: false },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }