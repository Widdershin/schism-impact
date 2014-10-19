ig.module(
    'game.entities.health_bar'
)
.requires(
    'impact.entity'
)
.defines(function(){

    HealthBar = ig.Entity.extend({
        init: function (x, y, player) {
            this.player = player;
            this.parent(x, y);
        },

        draw: function () {
            this.parent();

            ig.system.context.fillStyle = 'red';

            var topLeft = {},
                size = {};

            topLeft.x = ig.system.getDrawPos(this.player.pos.x - this.player.size.x / 2);
            topLeft.y = ig.system.getDrawPos(this.player.pos.y + this.player.size.y / 2);

            size.x = this.player.size.x * 2;
            size.y = 10;

            ig.system.context.fillRect(topLeft.x, topLeft.y, size.x, size.y);

            var healthBarWidth = size.x * (this.player.health / this.player.maxHealth);

            ig.system.context.fillStyle = 'lime';

            ig.system.context.fillRect(
                topLeft.x,
                topLeft.y,
                healthBarWidth,
                size.y
            );
        }


    });
});
