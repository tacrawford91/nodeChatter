var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {generateMessage,generateLocationMessage} = require('./utils/message')
const http = require('http');
var server = http.createServer(app); 
const socketIO = require('socket.io');
var io = socketIO(server);
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));


io.on('connection',(socket)=> {
    console.log('new connection');
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to nodeChatter'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));  

    socket.on('createMessage', (message,callback)=>{
        console.log('create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });


    socket.on('disconnect', ()=>{
        console.log('Client Disconnected');
    })
})


server.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});