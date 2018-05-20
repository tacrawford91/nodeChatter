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

socket.on('newLocationMessage', function(message){
   let li = $('<li>');
   let a = jQuery('<a  target="_blank">My Current Location </a>');
   li.text(`${message.from}:`);
   a.attr('href', message.url)
   li.append(a);
    $('#messages').append(li);
})

var messageTextbox = $('input[name=message]');
$('#message-form').on('submit', function(e){
    e.preventDefault()
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(data) {
        console.log('Got it' + data);
        messageTextbox.val('');
    })
});


var locationButton = $('#send-location')
locationButton.on('click', function(e){
    if(!navigator.geolocation) {
        return alert('Geolocation no supported by your browser.')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location....')
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Sending Location');
    }, function(){
        alert('Unable to fetch location.');
        locationButton.attr('disabled', 'disabled')
    })
})