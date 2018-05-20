var socket = io();
socket.on('connect',()=>{
    console.log('client connected so server!');
})
socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New Message',message);
})

// socket.on('welcome', (welcomeMessage)=>{
//     console.log('Welcome Bro Bro', welcomeMessage.text);
// });

// socket.on('joined', (newUser) =>{
//     console.log('someoneJoined',newUser.text);
// });