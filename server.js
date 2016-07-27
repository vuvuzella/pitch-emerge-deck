var express = require('express');
var http    = require('http');
var io      = require('socket.io');
var path    = require('path');

var app = express();

var masterUser = 'jeepers';
var masterPass = 'paramaybaon';

app.use(express.static(path.join(__dirname,'/deck')));
app.set('port', process.env.PORT || 5000);
var port = app.get('port');

// var server = http.createServer(app).listen(port, function() {
//   console.log('Express server listening to port', port);
// });

var server = http.Server(app);
var ioListener = io(server);

server.listen(port, function() {
  console.log('Express app listening to port', port);
});

var onMessage = function(data) {
  console.log('message received');
  console.log(data);
}

var onSlideChanged = function(data) {
  console.log('slidechanged received');
  console.log(data);
  ioListener.broadcast.emit('slidechanged', data);
}

ioListener.on('connect', function(socket) {
  console.log('connected!');
  socket.emit('message', 'Welcome from back');

  socket.on('message', function(data) {
    console.log('message received');
    console.log(data);
    // ioListener.broadcast.emit('slidechanged', data);
  });

  socket.on('slidechanged', function(data) {
    console.log('slidechanged received');
    socket.broadcast.emit('slidechanged', data);
  });
});


// ioListener.on('fragmentshown', function(data) {
//   console.log('fragmentshown received');
//   io.broadcast.emit('fragmentshown', data);
// });
