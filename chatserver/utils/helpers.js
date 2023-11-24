const isLoggedIn = (req) => {
    if (req.cookies.authToken) {
        return true
    } else {
        return false
    }
}

module.exports = { isLoggedIn }