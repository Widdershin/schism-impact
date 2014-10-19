ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.player',
    'game.entities.other_player',
    'game.entities.base_player'
)
.defines(function(){ "use strict";

    var MyGame = ig.Game.extend({

      // Load a font
        font: new ig.Font( 'media/04b03.font.png' ),

        players: {},
        backgroundMaps: [
            new ig.BackgroundMap(64, [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                ], 'media/ground.png')
        ],

        init: function() {
            ig.input.initMouse();

            ig.input.bind(ig.KEY.MOUSE1, 'clicked');

            var name = prompt('Name: ');

            this.spawnEntity(EntityPlayer, 30, 30, name);
            socket.on('load', this.loadPlayers.bind(this));
            socket.on('player joined', this.addPlayer.bind(this));
            socket.on('player move', this.setPlayerDestination.bind(this));
            socket.on('player left', this.removePlayer.bind(this));
            socket.emit('join game', name);
        },

        update: function() {
            this.parent();
        },

        draw: function() {
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here
            var x = ig.system.width/2,
                y = ig.system.height/2;


        },

        loadPlayers: function (players) {
            console.log('Loading players', players);
            var that = this;
            for (var playerName in players) {
                var player = players[playerName];
                console.log('Spawning ', player.name, player.x, player.y);
                that.players[player.name] = that.spawnEntity(EntityOtherPlayer, player.x, player.y, player.name);
            };
        },

        addPlayer: function (name) {
            this.players[name] = this.spawnEntity(EntityOtherPlayer, 15, 15, name);
        },

        setPlayerDestination: function (name, x, y) {
            this.players[name].setDestination(x, y);
        },

        removePlayer: function (name) {
            this.removeEntity(this.players[name]);
        }
    });

    ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
