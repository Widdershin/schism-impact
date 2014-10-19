ig.module(
    'game.entities.other_player'
)
.requires(
    'impact.entity'
)
.defines(function(){

    EntityOtherPlayer = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x: 32, y: 32},
        offset: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/player.png', 32, 32),

        destinationDelta: 2,

        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);

            this.setDestination(x, y);

            this.parent(x, y, settings);
        },

        update: function() {
            function distanceBetween(p1, p2) {
                a = p2.x - p1.x;
                b = p2.y - p1.y;

                return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            }

            if (distanceBetween(this.pos, this.destination) > this.destinationDelta) {
                var speed = 100;
                this.vel = {
                    x: speed * Math.sign(this.destination.x - this.pos.x),
                    y: speed * Math.sign(this.destination.y - this.pos.y),
                };
            }
            else {
                this.vel = {
                    x: 0,
                    y: 0,
                }
            }

            this.parent();
        },

        setDestination: function(x, y) {
            this.destination = {
                x: x,
                y: y,
            };
        }
    });
});
