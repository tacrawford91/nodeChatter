var socket = io();

socket.on('connect',()=>{
    console.log('client connected so server!');
})
socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let messageTemplate = $('#message-template').html();
    let html = Mustache.render(messageTemplate,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let locationMessageTemplate = $('#location-message-template').html();
    let html = Mustache.render(locationMessageTemplate,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

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