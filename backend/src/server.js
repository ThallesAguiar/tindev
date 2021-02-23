require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket =>{
    const { user } = socket.handshake.query; 
    
    console.log(user,socket.id);

    connectedUsers[user] = socket.id;
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m7gxb.mongodb.net/socialmate?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connected!'));

app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);