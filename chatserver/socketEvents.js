let activeUsers = 0

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');
        activeUsers++
        console.log("Active users", activeUsers)
        io.emit("onlineUsers", activeUsers)
        // Listen for a custom event 'chat message'
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            // Broadcast the message to all connected clients
            io.emit('chat message', msg);
        });

        // Listen for the 'disconnect' event
        socket.on('disconnect', () => {
            console.log('User disconnected');
            activeUsers--;
            io.emit("onlineUsers", activeUsers)
        });


    });
};