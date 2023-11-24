const express = require('express');
const router = express.Router();

router.get('/sendMessage', () => {
    try {
        return res.status(200).json({ message: "Success" })
    }
    catch (Err) {
        console.log("Err", Err)
        return res.status(500).json({ message: "Error" })
    }
})

module.exports = router 