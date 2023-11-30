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

function getKeyByValue(obj, valueToDelete) {
    let objectId;
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === valueToDelete) {
            objectId = obj[key];
            break; // If you want to delete only the first matching key
        }
    }
    return objectId
}

module.exports = {
    getOnlineUsers: () => onlineUsers,
    setOnlineUsers: (userId, socketId) => {
        onlineUsers[userId] = socketId
    },
    deleteOnlineUsers: (value) => {
        deleteKeyByValue(onlineUsers, value)
    },
    getKeyByValue: (socketId) => getKeyByValue(onlineUsers, socketId)
};