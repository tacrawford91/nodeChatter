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

    socket.on('disconnect', ()=>{
        console.log('Client Disconnected');
    })
})


server.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});