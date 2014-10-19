var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = [];

app.use(express.static('public'));
app.use(express.static('impact'));
app.use(express.static('schism'));

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

io.on('connection', function (socket) {
  var player = {};

  socket.on('join game', function (name) {
    player = {
      name: name,
      x: 0,
      y: 0,
    };

    console.info(name + ' joined game');

    socket.emit('load players', players);

    players.push(player);

    socket.broadcast.emit('player joined', name);
  });

  socket.on('player moved', function (x, y) {
    player.x = x;
    player.y = y;

    socket.broadcast.emit(
      'player moved',
      player.name,
      player.x,
      player.y
    );
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
})
