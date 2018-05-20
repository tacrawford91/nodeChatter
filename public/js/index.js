var socket = io();
socket.on('connect',()=>{
    console.log('client connected so server!');
})
socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New Message',message);
    let newest = $('<li>').text(`${message.from} - ${message.text}`);
    $('#messages').append(newest);
})


$('#message-form').on('submit', function(e){
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, function(data) {
        console.log('Got it' + data);
    })
});