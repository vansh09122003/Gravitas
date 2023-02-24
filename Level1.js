class Level1 extends Phaser.Scene{
  constructor(){
    super('Level')
  }

  create(){

    lvl=0;

    this.gravity="y";
    this.dir=0;
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setInteractive();
    this.background.setOrigin(0,0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 150, 'block2').setScale(2.75,0.65).refreshBody().setInteractive();
    this.platforms.create(960, 360, 'block2').setScale(1.2, 0.65).refreshBody().setInteractive();
    this.platforms.create(600, 700, 'block2').setScale(2.2, 1).refreshBody().setInteractive();
    this.platforms.create(220, 700, 'block2').setScale(0.35, 4.7).refreshBody().setInteractive();

    this.player = this.physics.add.sprite(220, 70, 'player').setScale(0.85);
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

    this.player.alpha = 0.3;
    this.player.body.enable = false;

    this.warmhole.alpha = 1;
    var tween = this.tweens.add({
      targets: this.warmhole,
      scale: 0.25,
      ease: 'Linear',
      duration: 1000,
      repeat:0,
      onComplete: function(){
        this.player.alpha = 1;
        this.player.body.enable = true;

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
      callbackScope: this,
    });

    this.physics.add.overlap(this.player, this.enemies, this.gameOut, null, this);
    this.physics.add.overlap(this.player, this.warmhole2, this.nextLevel, null, this);

    this.Text1 = this.add.text(250, 20, "Level completed Scene load", {
      font: "35px Arial",
      fill: "white"
    });
    this.Text1.visible = false;

    pauseBtn=this.add.image(1230,50,"pause").setScale(0.7).setInteractive();
    pauseBtn.on('pointerdown',this.onPause);

    inGameMenuBg=this.add.image(640,360,"inGameMenu").setScale(1.3);
    inGameMenuBg.visible=false;
    reloadBtn=this.add.image(640,360,"reload").setScale(0.7).setInteractive();
    reloadBtn.on('pointerdown',this.onReload);
    reloadBtn.visible=false;
    playBtn=this.add.image(500,360,"play").setScale(0.7).setInteractive();
    playBtn.on('pointerdown',this.onPlay);
    playBtn.visible=false;
    menuBtn=this.add.image(780,360,"menu").setScale(0.7).setInteractive();
    menuBtn.on('pointerdown',this.onMenu);
    menuBtn.visible=false;

  }

  onPause(){
    inGameMenuBg.visible=true;
    reloadBtn.visible=true;
    menuBtn.visible=true;
    playBtn.visible=true;
    pauseBtn.visible=false;
    game.scene.pause("Level"+lvl);
  }
  onPlay(){
    inGameMenuBg.visible=false;
    reloadBtn.visible=false;
    menuBtn.visible=false;
    playBtn.visible=false;
    pauseBtn.visible=true;
    game.scene.resume("Level"+lvl);
  }
  onReload(){
    inGameMenuBg.visible=false;
    reloadBtn.visible=false;
    menuBtn.visible=false;
    playBtn.visible=false;
    pauseBtn.visible=true;
    game.scene.start("Level"+lvl);
  }
  onMenu(){
    inGameMenuBg.visible=false;
    reloadBtn.visible=false;
    menuBtn.visible=false;
    playBtn.visible=false;
    pauseBtn.visible=true;
    game.scene.stop("Level"+lvl);
    game.scene.start("Menu");
  }


  update(){
    this.PlayerPhysics();
  }

  gameOut(player, enemy){
    enemy.play('attack',true);
    this.player.body.enable = false;
    this.player.visible = false;

    this.scene.restart();
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