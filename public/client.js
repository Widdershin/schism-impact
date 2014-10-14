var keys = {
  W: 119,
  A: 97,
  S: 115,
  D: 100
}

var MmoTest = (function (io){
  var me = {};

  var socket = io();
  var players = {};

  var getPlayerName = function () {
    return prompt("Player name:", "player");
  };

  var addPlayer = function (player) {
    $('#game').append(player.div);
    players[player.name] = player;
  };

  me.createPlayer = function () {
    var player = new Player(getPlayerName());
    socket.emit('player joined', player.name);

    $(document).keypress(function (e) {
      player.handleInput(e);
      socket.emit('player moved', player.x, player.y);
    });

    addPlayer(player);
  };

  socket.on('player joined', function(playerName) {
    player = new Player(playerName);
    addPlayer(player);
  });

  socket.on('player moved', function(playerName, x, y) {
    var player = players[playerName];

    player.x = x;
    player.y = y;
    player.draw();
  });

  return me;
}(io));

function Player(name) {
  this.name = name;
  this.x = 5;
  this.y = 5;
  this.div = $('<div class="player"></div>').text(name);
  this.draw();
}

Player.prototype.draw = function () {
  this.div.css({
    top: this.y,
    left: this.x,
  });
}

Player.prototype.handleInput = function (e) {
  switch(e.which) {
    case keys.W:
      this.y -= 10;
      break;
    case keys.A:
      this.x -= 10;
      break;
    case keys.S:
      this.y += 10;
      break;
    case keys.D:
      this.x += 10;
      break;
    default:
      break;
  }
  this.draw();
}

$(function () {
  MmoTest.createPlayer();
});
