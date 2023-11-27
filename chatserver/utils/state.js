// state.js
let onlineUsers = {}
function deleteKeyByValue(obj, valueToDelete) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === valueToDelete) {
            delete obj[key];
            break; // If you want to delete only the first matching key
        }
    }
}

module.exports = {
    getOnlineUsers: () => onlineUsers,
    setOnlineUsers: (userId, socketId) => {
        onlineUsers[userId] = socketId
    },
    deleteOnlineUsers: (value) => {
        deleteKeyByValue(onlineUsers, value)
    },
};