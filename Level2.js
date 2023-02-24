class Level2 extends Phaser.Scene{
    constructor(){
        super('Level1')
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setInteractive();
        this.background.setOrigin(0,0);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(1120, 200, 'block1').setScale(0.75).refreshBody().setInteractive();
        this.platforms.create(1000, 410, 'block1').setScale(0.75).refreshBody().setInteractive();
        this.platforms.create(660, 360, 'block1').setScale(0.75).refreshBody().setInteractive();
        this.platforms.create(360, 550, 'block1').setScale(0.75).refreshBody().setInteractive();
        this.platforms.create(200, 290, 'block1').setScale(0.75).refreshBody().setInteractive();

        this.gravity="y";
        this.dir=0;

        this.player = this.physics.add.sprite(220, 70, "player").setScale(0.85);
        this.physics.add.collider(this.player,this.platforms);
        this.player.body.allowRotation = true;
        this.player.setOrigin(0.5,0.5);
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.player.body.world.on('worldbounds',this.onBoundOut,this.player);
        this.player.setBounce(0);
        this.player.setGravityY(300);
    
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.warmhole = this.physics.add.sprite(220, 50, 'warmhole').setScale(0);
        this.warmhole2 = this.physics.add.sprite(1210, 370, 'warmhole').setScale(0.25);
    
        this.enemies = this.physics.add.group();
        this.enemies.create(900, 80, 'enemy').setScale(0.5);
        this.enemies.create(950, 290, 'enemy').setScale(0.5);
        this.enemies.create(810, 430, 'enemy').setScale(0.5).flipY = true;
    
        
    
        this.physics.add.overlap(this.player, this.enemies, this.gameOut, null, this);
        this.physics.add.overlap(this.player, this.warmhole2, this.nextLevel, null, this);
    
        this.Text = this.add.text(250, 20, "You are out", {
              font: "35px Arial",
              fill: "white"
            });
    
        this.Text1 = this.add.text(250, 20, "Level completed Scene load", {
              font: "35px Arial",
              fill: "white"
            });
        this.Text1.visible = false;
        
        this.Text.visible = false;
        this.player.alpha = 0.3;
    
        this.warmhole.alpha = 1;
        var tween = this.tweens.add({
          targets: this.warmhole,
          scale: 0.25,
          ease: 'Linear',
          duration: 1000,
          repeat:0,
          onComplete: function(){
            this.player.alpha = 1;
    
            var tween2 = this.tweens.add({
              targets: this.warmhole,
              scale: 0,
              ease: 'Linear',
              duartion : 1000,
              reapeat:0,
    
              onComplete: function (){
                tween.stop();
              }
            })
          },
          callbackScope: this
        });    

    }

    update(){
        this.PlayerPhysics();
    }

    gameOut(player, enemy){
      enemy.play('attack',true);
      this.player.body.enable = false;
      this.player.visible = false;
      this.Text.visible = true;
      
    }
  
    nextLevel(player,warmhole){
      this.Text1.visible = true;
      this.player.body.enable = false;
      this.player.visible = false;
    }
    
    onBoundOut(){
      game.scene.start('Level1');
    }
    
    PlayerPhysics(){
    
      if(this.gravity=="y"){
        if(this.dir==0){
          if (this.AKey.isDown) {
            this.player.setVelocityX(-100);
            this.player.play("left",true);
          } 
        else if (this.DKey.isDown) {
            this.player.setVelocityX(100);
            this.player.play("right",true);
          } 
        else if(this.SpaceKey.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-250);
          }
        else{
            this.player.play("idle")
            this.player.setVelocityX(0);
          }
        }
          else if(this.dir==1){
            if (this.AKey.isDown) {
              this.player.setVelocityX(-100);
              this.player.play("right",true);
            } 
            else if (this.DKey.isDown) {
              this.player.setVelocityX(100);
              this.player.play("left",true);
            } 
            else if(this.SpaceKey.isDown && this.player.body.touching.up){
              this.player.setVelocityY(250);
            }
            else{
              this.player.play("idle")
              this.player.setVelocityX(0);
            }
          }
        }
        else if(this.gravity=="x"){
          if(this.dir==0){
            if (this.WKey.isDown) {
              this.player.setVelocityY(-100);
              this.player.play("right",true);
            } 
            else if (this.SKey.isDown) {
              this.player.setVelocityY(100);
              this.player.play("left",true);
            } 
            else if(this.SpaceKey.isDown && this.player.body.touching.right){
              this.player.setVelocityX(-250);
            }
            else{
              this.player.play("idle");
              this.player.setVelocityY(0);
            }
          }
          else if(this.dir==1){
            if (this.WKey.isDown) {
              this.player.setVelocityY(-100);
              this.player.play("left",true);
            } 
            else if (this.SKey.isDown) {
              this.player.setVelocityY(100);
              this.player.play("right",true);
            } 
            else if(this.SpaceKey.isDown && this.player.body.touching.left){
              this.player.setVelocityX(250);
            }
            else{
              this.player.play("idle");
              this.player.setVelocityY(0);
            }
          }
        }
    
        if(this.AKey.isDown && this.SpaceKey.isDown){
          this.player.setGravityY(0);
          this.player.setGravityX(300);
          this.player.setAngle(-90);
          this.player.setSize(96,52);
          this.gravity="x";
          this.dir=0;
        }
        else if(this.DKey.isDown && this.SpaceKey.isDown){
          this.player.setGravityY(0);
          this.player.setGravityX(-300);
          this.player.angle=90;
          this.player.setSize(96,52);
          this.gravity="x";
          this.dir=1;
        }
        else if(this.WKey.isDown && this.SpaceKey.isDown){
          this.player.setGravityY(300);
          this.player.setGravityX(0);
          this.player.angle=0;
          this.player.setSize(52,96);
          this.gravity="y";
          this.dir=0;
        }
        else if(this.SKey.isDown && this.SpaceKey.isDown){
          this.player.setGravityY(-300);
          this.player.setGravityX(0);
          this.player.angle=180;
          this.player.setSize(52,96);
          this.gravity="y";
          this.dir=1;
        }
      }
}