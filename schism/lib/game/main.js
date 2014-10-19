ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.player',
    'game.entities.other_player'
)
.defines(function(){ "use strict";

    var MyGame = ig.Game.extend({

      // Load a font
        font: new ig.Font( 'media/04b03.font.png' ),

        players: {},


        init: function() {
            this.spawnEntity(EntityPlayer, 30, 30);
            ig.input.initMouse();

            ig.input.bind(ig.KEY.MOUSE1, 'clicked');

            var name = prompt('Name: ');

            socket.emit('join game', name);
            socket.on('load players', this.loadPlayers.bind(this));
            socket.on('player joined', this.addPlayer.bind(this));
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
            console.log(players);
        },

        addPlayer: function (name) {
            this.players[name] = this.spawnEntity(EntityOtherPlayer, 15, 15);
        },
    });

    ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
