ig.module(
    'game.entities.other_player'
)
.requires(
    'impact.entity',
    'game.entities.player'
)
.defines(function(){

    EntityOtherPlayer = EntityPlayer.extend({
    });
});
