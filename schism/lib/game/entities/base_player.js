ig.module(
    'game.entities.base_player'
)
.requires(
    'impact.entity',
    'game.entities.health_bar'
)
.defines(function(){ "use strict";

    window.EntityBasePlayer = ig.Entity.extend({

        maxHealth: 100,
        health: 100,
        collides: ig.Entity.COLLIDES.ACTIVE,

        size: {x: 32, y: 32},
        offset: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/player.png', 32, 32),

        maxVel: {x: 25, y: 25},
        friction: {x: 30, y: 30},
        destinationDelta: 15,

        init: function (x, y, name) {
            this.addAnim('idle', 1, [0]);

            this.setDestination(x, y);

            this.name = name;

            this.parent(x, y);
            this.healthBar = ig.game.spawnEntity(HealthBar, 0, 0, this);
        },

        distanceBetween: function (p1, p2) {
            var a, b;
            a = p2.x - p1.x;
            b = p2.y - p1.y;

            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        },

        calculateAccelerationRatios: function (p1, p2) {
            var difference = {
                x: p2.x - p1.x,
                y: p2.y - p1.y,
            }

            var total = Math.abs(difference.x) + Math.abs(difference.y);

            return {
                x: difference.x / total,
                y: difference.y / total
            }
        },

        update: function() {

            if (this.distanceBetween(this.pos, this.destination) > this.destinationDelta) {
                var accel = 100;

                var acceleration_ratios = this.calculateAccelerationRatios(this.pos, this.destination);

                this.vel.x = accel * acceleration_ratios.x;
                this.vel.y = accel * acceleration_ratios.y;
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
        },

        draw: function() {
            this.parent();

            ig.game.font.draw(
                this.name,
                this.pos.x,
                this.pos.y - this.size.y / 2 - 10,
                ig.Font.ALIGN.CENTER
            )
        },

    });

});
