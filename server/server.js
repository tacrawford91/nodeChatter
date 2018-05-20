var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const http = require('http');
var server = http.createServer(app); 
const socketIO = require('socket.io');
var io = socketIO(server);
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));


io.on('connection',(socket)=> {
    console.log('new connection');
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat App',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Entered in the room',
        createdAt: new Date().getTime()
    })    

    socket.on('createMessage', (message)=>{
        console.log('create Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })
    socket.on('disconnect', ()=>{
        console.log('Client Disconnected');
    })
})


server.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});