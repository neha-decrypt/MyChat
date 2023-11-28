const { request } = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log("cookies", req)
    const token = req.headers['authorization'];
    console.log("Token", token)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }


        req.email = decoded.email
        req.id = decoded.id
        // console.log("decoded", decoded)
        // Move to the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;