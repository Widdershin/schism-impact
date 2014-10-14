var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', function (socket) {
  console.log('a user connected');
  var playerName = "";

  socket.on('chat message', function(message) {
    io.emit('chat message', message);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('player joined', function (name) {
    playerName = name;
    socket.broadcast.emit('player joined', name);
  });

  socket.on('player moved', function (x, y) {
    socket.broadcast.emit('player moved', playerName, x, y);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
})
