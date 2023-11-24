const { isLoggedIn } = require("./utils/helpers");

let activeUsers = 0
let onlineUsers = {}

function deleteKeyByValue(obj, valueToDelete) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === valueToDelete) {
            delete obj[key];
            break; // If you want to delete only the first matching key
        }
    }
}

const ioFunc = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');
        activeUsers++
        console.log("Active users", activeUsers)
        io.emit("onlineUsers", activeUsers)
        // if (isLoggedIn()) {
        //     onlineUsers[userId] = socket.id
        //     console.log("online user", onlineUsers)
        // }
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
            deleteKeyByValue(socket.id)
        });

        socket.on('loggedIn', (userId) => {
            console.log('User Logged In');
            onlineUsers[userId] = socket.id
            console.log("online user", onlineUsers)
        });

    });
};

module.exports = { ioFunc }