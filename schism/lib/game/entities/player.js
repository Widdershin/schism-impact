ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityPlayer = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x: 32, y: 32},
        offset: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/player.png', 32, 32),

        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);

            this.parent(x, y, settings);
        }
    });

});
