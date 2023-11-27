const socketIO = require('socket.io');
const { setOnlineUsers, getOnlineUsers, deleteOnlineUsers } = require('./utils/state');


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

        socket.on('messageDelivered', () => {
            console.log('Delivered');
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