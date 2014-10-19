ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.base_player',
    'game.entities.other_player',
    'game.entities.collision_checker'
)
.defines(function(){

    EntityPlayer = EntityBasePlayer.extend({
        getPlayerUnderCursor: function () {
            var players = ig.game.getEntitiesByType(EntityOtherPlayer);
            var collisionChecker = ig.game.spawnEntity(
                EntityCollisionChecker,
                ig.input.mouse.x,
                ig.input.mouse.y
            );

            playerUnderCursor = players.find(function (player) {
                return player.touches(collisionChecker);
            });

            collisionChecker.kill();

            return playerUnderCursor;
        },

        update: function() {
            if (ig.input.pressed('click')) {
                playerUnderCursor = this.getPlayerUnderCursor();


                if (playerUnderCursor) {
                    commandType = "attack";
                } else {
                    commandType = "move";
                }

                this.setDestination(ig.input.mouse.x, ig.input.mouse.y);
                socket.emit('player move', this.destination.x, this.destination.y);
            }
            this.parent();
        },
    });

});
