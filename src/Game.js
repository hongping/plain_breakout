Game.Game = function(g) {
    this.score = 0;
};

Game.Game.prototype = {
    preload: function(g) {},
    create: function(g) {
        g.physics.startSystem(Phaser.Physics.ARCADE);
        g.physics.arcade.checkCollision.down = false;
        
        this.paddle = this.add.sprite(160,474,'paddle');
        g.physics.enable(this.paddle,Phaser.Physics.ARCADE);
        this.paddle.body.immovable = true;
        this.paddle.body.bounce.set(1);
        this.paddle.body.collideWorldBounds = true;
        this.paddle.anchor.setTo(0.5,0.5);
        
        this.ball = this.add.sprite(160,459.5,'ball');
        g.physics.enable(this.ball,Phaser.Physics.ARCADE);
        this.ball.body.bounce.set(1);
        this.ball.body.collideWorldBounds = true;
        this.ball.checkWorldBounds = true;
        this.ball.events.onOutOfBounds.add(this.ballLost,this);
        this.ball.anchor.setTo(0.5,0.5);
        
        this.blocks = this.add.group();
        this.blocks.enableBody = true;
        this.blocks.physicsBodyType = Phaser.Physics.ARCADE;
        
        var block;
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                block = this.blocks.create(32+(x*52),50+(y*26),"block_"+(y+1));
                block.body.bounce.set(1);
                block.body.immovable = true;
            }
        } 

        this.particlesEmitter = g.add.emitter(0,0,100);
        this.particlesEmitter.makeParticles('burst');
        
        this.scoreText = g.add.text(10, 10, 'score: 0',
            { font: "20px Courier New", fill: "#000000", align: "left" });
        this.score = 0;
        
        this.startText = g.add.text(60,240,'PRESS LEFT ARROW OR RIGHT ARROW TO BEGIN',
            { font: "23px Courier New", fill: "#000000", align: "center" });
        this.startText.wordWrap      = true;
        this.startText.wordWrapWidth = 200;
        
        this.explosionSound = g.add.audio('explosion');
        
        this.cursor = this.input.keyboard.createCursorKeys();
        this.firstKeyDown = true;
    },
    update: function(g) {
        if ((this.cursor.left.isDown || this.cursor.right.isDown) 
            && this.firstKeyDown) {
            this.firstKeyDown = false;
            this.ball.body.velocity.y = -500;
            this.ball.body.velocity.x = Math.floor(Math.random()*501)-250;
            this.startText.destroy();
        } else {
            g.physics.arcade.collide(this.ball,this.paddle,this.ballHitPaddle,null,this);
            g.physics.arcade.collide(this.ball,this.blocks,this.ballHitBlocks,null,this);
        }
        
        if (this.cursor.left.isDown)
            if (this.paddle.x <= 5) { this.paddle.body.velocity.x = 0; }
            else { this.paddle.body.velocity.x = -260; }
        else if (this.cursor.right.isDown)
            if (this.paddle.x >= 288) { this.paddle.body.velocity.x = 0; }
            else { this.paddle.body.velocity.x = 260;  }
        else
            this.paddle.body.velocity.x = 0;
    },
    
    ballHitPaddle: function(_ball,_paddle) {
        if (_ball.x > _paddle.x) {
            _ball.body.velocity.x = (_ball.x - _paddle.x) * 8;
        } else if (_paddle.x > _ball.x) {
            _ball.body.velocity.x = (_paddle.x - _ball.x) * -8;
        } else if (_paddle.x == _ball.x) {
            _ball.body.velocity.x = 2 + Math.random()*8;
        }
    },
    
    ballHitBlocks: function(_ball,_brick) {
        this.particlesEmitter.x = _brick.x;
        this.particlesEmitter.y = _brick.y;
        
        this.explosionSound.play('',0,3,false);
        
        _brick.kill();
        
        this.score += 10;
        this.scoreText.text = "score: "+this.score;
        
        this.particlesEmitter.start(true,500,null,20);
    },
    
    ballLost: function() {
        this.game.state.start('Game');
        
    },
};