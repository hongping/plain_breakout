Game.Preload = function(g) {};

Game.Preload.prototype = {
    preload: function(g) {
        this.load.setPreloadSprite(this.add.sprite(60,220,'progressbar'));
        this.load.image('paddle','img/paddle.png');
        this.load.image('ball','img/ball.png');
        this.load.image('burst','img/burst.png');
        this.load.image('block_1','img/blue_block.png');
        this.load.image('block_2','img/green_block.png');
        this.load.image('block_3','img/red_block.png');
        this.load.image('block_4','img/violet_block.png');
        this.load.image('block_5','img/yellow_block.png');
        this.load.audio('bgmusic','asset/bgmusic.wav');
        this.load.audio('explosion','asset/explosion.wav');
    },
    create: function(g) {
        this.bgmusic = this.add.audio('bgmusic');
        this.bgmusic.play('',0,1,true);
    },
    update: function(g) {
        g.state.start('Game');
    },
};