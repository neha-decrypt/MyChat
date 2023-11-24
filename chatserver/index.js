const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const userRoutes = require('./routes/user.routes')
const chatRoutes = require('./routes/chat.routes')
const socketEvents = require('./socketEvents');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

app.use("/user", userRoutes)
app.use("/chat", chatRoutes)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


const server = http.createServer(app)
const io = socketIO(server);

socketEvents(io);

server.listen(8080, () => {
    console.log("Listening..")
})
