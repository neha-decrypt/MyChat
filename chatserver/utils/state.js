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
    setOnlineUsers: (value) => {
        onlineUsers[userId] = socket.id
    },
    deleteOnlineUsers: (value) => {
        deleteKeyByValue(value)
    },
};