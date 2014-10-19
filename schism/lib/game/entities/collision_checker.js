ig.module(
    'game.entities.collision_checker'
)
.requires(
    'impact.entity'
)
.defines(function(){ "use strict";
    window.EntityCollisionChecker = ig.Entity.extend({
        size: {x: 2, y: 2},
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
    });
});
