class Level extends Phaser.Scene{
  constructor(){
    super('Level')
  }

  create(){

    lvl=1;

    this.gravity="y";
    this.dir=0;
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setInteractive();
    this.background.setOrigin(0,0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 150, 'block2').setScale(2.75,0.65).refreshBody();
    this.platforms.create(960, 360, 'block2').setScale(1.2, 0.65).refreshBody();
    this.platforms.create(600, 700, 'block2').setScale(2.2, 1).refreshBody();
    this.platforms.create(220, 700, 'block2').setScale(0.35, 4.7).refreshBody();

    this.player = this.physics.add.sprite(220, 70, "player").setScale(0.85);
    this.physics.add.collider(this.player,this.platforms);
    this.player.body.allowRotation = true;
    this.player.setOrigin(0.5,0.5);
    this.player.setCollideWorldBounds(true);
    this.player.body.onWorldBounds = true;
    this.player.body.world.on('worldbounds',this.onBoundOut,this.player);
    this.player.setBounce(0);
    this.player.setGravityY(300);

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

    this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        
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
    this.playerPhysics();
  }

  onBoundOut(){
    this.onReload();
  }

  playerPhysics(){

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