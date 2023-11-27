const express = require('express')
const cors = require('cors')
const http = require('http')
const userRoutes = require('./routes/user.routes')
const chatRoutes = require('./routes/chat.routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { setupSocket } = require('./setupSocket')

require('dotenv').config()

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
app.use(cors())
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);
app.use(cookieParser());
app.use("/user", userRoutes)
app.use("/chat", chatRoutes)

const server = http.createServer(app)
// const io = setupSocket(server);
const io = setupSocket(server, {
    cors: "*"
});

// ioFunc(io);

server.listen(8080, () => {
    console.log("Listening..")
})

module.exports = { io, app, server };