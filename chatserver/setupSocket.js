const socketIO = require('socket.io');
const { setOnlineUsers, getOnlineUsers, deleteOnlineUsers, getKeyByValue } = require('./utils/state');
const { Chat } = require('./models/chat.model');
const { default: mongoose } = require('mongoose');


function setupSocket(server, obj) {
    const io = socketIO(server, obj);

    // Add your Socket.IO event handling here
    io.on('connection', (socket) => {

        const isLoggedIn = socket.handshake?.query?.isLoggedIn;
        const userId = socket.handshake?.query?.userId;
        if (isLoggedIn) {
            console.log('A user connected');
            setOnlineUsers(userId, socket.id)
            console.log("online user", getOnlineUsers())
        }

        socket.on('disconnect', () => {
            console.log('User disconnected');
            deleteOnlineUsers(socket.id)
        });

        socket.on('messagesDelivered', async (userId) => {
            let from = userId
            let usersInvolved = await Chat.find({ from: new mongoose.Types.ObjectId(from), isDelivered: false })
            console.log("Here--->>", usersInvolved, from)
            let res = await Chat.updateMany({ from: new mongoose.Types.ObjectId(from) }, { $set: { isDelivered: true } })
            for (let i = 0; i < usersInvolved?.length; i++) {
                io.to(getOnlineUsers(usersInvolved[i]?.to)).emit("Message Delivered")
            }
            console.log('Delivered', res);
        });

        socket.on('messageRead', () => {
            console.log('Message Opened');
        });

        socket.on('loggedIn', (userId) => {
            console.log('User Logged In');
            setOnlineUsers(userId, socket.id)
            console.log("online user", getOnlineUsers())
        });
    });

    return io;
}

// Directly export the io instance
module.exports = { setupSocket };