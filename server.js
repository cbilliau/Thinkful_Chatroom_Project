var socket_io = require('socket.io');
var http = require('http');
var express = require('express');


var count = 0;
var userCountText = function(num) {
  return 'There are now ' + num + ' users in the chat';
};


var app = express();
app.use(express.static('public'));


var server = http.Server(app); // wrapping express (app) in http.Server allows Socket.IO to run alongside Express
var io = socket_io(server);// initialize an io object, by passing the server to into the socket_io function. This creates a Socket.IO Server, which is an EventEmitter

// add a listener to the connection event of the server
io.on('connection', function (socket) {
  count++;
  console.log('Client connected');

  // log new user joining
  socket.broadcast.emit('userJoin', 'A new user has joined the chat at scoekt id: ' + socket.id);

  // # users in room when someone connects
  io.emit('count', userCountText(count));

  // Recieve msg
  socket.on('message', function(message) {
    console.log('Recieved message:', message);
    // Broadcast msg
    socket.broadcast.emit('message', message);
  });

  // # users in room when person leaves
  socket.on('disconnect', function(message) {
    count--;
    io.emit('count', userCountText(count));
  })
});



server.listen(process.env.PORT || 8080); // server.listen rather than app.listen
