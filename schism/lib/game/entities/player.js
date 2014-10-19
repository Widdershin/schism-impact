ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.base_player'
)
.defines(function(){

    EntityPlayer = EntityBasePlayer.extend({
        update: function() {
            if (ig.input.pressed('clicked')) {
                this.setDestination(ig.input.mouse.x, ig.input.mouse.y);
                socket.emit('player move', this.destination.x, this.destination.y);
            }
            this.parent();
        },
    });

});
