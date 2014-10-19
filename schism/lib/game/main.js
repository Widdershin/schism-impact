ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.entities.player'
)
.defines(function(){

  MyGame = ig.Game.extend({

      // Load a font
      font: new ig.Font( 'media/04b03.font.png' ),


      init: function() {
        this.spawnEntity(EntityPlayer, 30, 30);
        ig.input.initMouse();

        ig.input.bind(ig.KEY.MOUSE1, 'clicked');
          // Initialize your game here; bind keys etc.
      },

      update: function() {
          // Update all entities and backgroundMaps
          this.parent();

          // Add your own, additional update code here
      },

      draw: function() {
          // Draw all entities and backgroundMaps
          this.parent();

          // Add your own drawing code here
          var x = ig.system.width/2,
              y = ig.system.height/2;
      }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
