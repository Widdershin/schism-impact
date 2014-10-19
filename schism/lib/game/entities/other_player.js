ig.module(
    'game.entities.other_player'
)
.requires(
    'impact.entity',
    'game.entities.base_player'
)
.defines(function(){

    EntityOtherPlayer = EntityBasePlayer.extend({
    });
});
