const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//utils
const {generateMessage,generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
//Socket
const http = require('http');
const server = http.createServer(app); 
const socketIO = require('socket.io');
const io = socketIO(server);
var users = new Users()
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));


io.on('connection',(socket)=> {
    console.log('new connection');
    
 

    socket.on('join', (params,callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required')
        };
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        //io.emit - emits to all conneccted users -- in a room -- io.to('room name').emit
        //socket.broadcast.emit  - emits to all connected on socekt server except user --> socket.broadcast.to('room name').emit
        //socket.emit - emits event specific to one user 

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to nodeChatter'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); 
        callback();
    })

    socket.on('createMessage', (message,callback)=>{
        console.log('create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });


    socket.on('disconnect', ()=>{
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`))
        }
    })
})


server.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});