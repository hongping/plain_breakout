var Game = {
    width  : 320,
    height : 480,
};

Game.Boot = function(g) {};

Game.Boot.prototype = {
    preload: function(g) {
        g.stage.backgroundColor = '#FFFFFF';
        this.load.image('progressbar','img/progressbar.png');
    },
    create: function(g) {},
    update: function(g) {
        g.state.start('Preload');
    }
};