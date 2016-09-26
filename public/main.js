$(document).ready(function() {
    var socket = io(); //connect to Socket.IO server
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message); // sends a message to the Socket.IO server. The first argument is a name for our message. The second argument is some data to attach to our message.
        input.val('');
    });

    socket.on('message', addMessage);

    socket.on('userJoin', addMessage);

    socket.on('count', addMessage);
});
