var keys = {
  W: 119,
  A: 97,
  S: 115,
  D: 100
}

var MmoTest = (function (io){
  var me = {};

  var socket = io();
  me.players = {};

  var addPlayer = function (player) {
    $('#game').append(player.div);
    me.players[player.name] = player;
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
    var player = me.players[playerName];

    player.updatePosition(x, y);
  });

  socket.on('load players', function(players) {
    players.forEach(function(player) {
      var inGamePlayer = new Player(player.name);
      inGamePlayer.updatePosition(player.x, player.y);
      addPlayer(inGamePlayer);
    });
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

Player.prototype.updatePosition = function (x, y) {
  this.x = x;
  this.y = y;
  this.draw();
}

$(function () {
  MmoTest.createPlayer();
});
