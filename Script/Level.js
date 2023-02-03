class Level extends Phaser.Scene{
  constructor(){
    super('Level')
  }

  create(){
    this.gravity="y";
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setInteractive();
    this.background.setOrigin(0,0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 150, 'block2').setScale(2.75,0.65).refreshBody().setInteractive();
    this.platforms.create(960, 360, 'block2').setScale(1.2, 0.65).refreshBody().setInteractive();
    this.platforms.create(600, 700, 'block2').setScale(2.2, 1).refreshBody().setInteractive();
    this.platforms.create(220, 700, 'block2').setScale(0.35, 4.7).refreshBody().setInteractive();

    this.player = this.physics.add.sprite(220, 70, "player").setScale(0.85);
    this.physics.add.collider(this.player,this.platforms);
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
  }

  update(){
    this.movePlayerManager();
  }

  onBoundOut(){
    game.scene.start('Level');
  }

  movePlayerManager(){

    if(this.gravity=="y"){
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
    else if(this.gravity=="x"){
      if (this.AKey.isDown) {
        this.player.setVelocityY(-100);
        this.player.play("right",true);
      } 
      else if (this.DKey.isDown) {
        this.player.setVelocityY(100);
        this.player.play("left",true);
      } 
      else if(this.SpaceKey.isDown && this.player.body.touching.down){
        this.player.setVelocityX(-250);
      }
      else{
        this.player.play("idle");
        this.player.setVelocityY(0);
      }
    }
    /*if (this.AKey.isDown) {
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
      if(this.gravity=="y"){
        this.player.setVelocityX(0);
      }
      else if(this.gravity=="x"){
        this.player.setVelocityY(0);
      }
      this.player.play("idle")
    }*/

    if(this.AKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(0);
      this.player.setGravityX(300);
      this.player.angle=-90;
      this.gravity="x";
    }
    else if(this.DKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(0);
      this.player.setGravityX(-300);
      this.player.angle=90;
      this.gravity="x";
    }
    else if(this.WKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(300);
      this.player.setGravityX(0);
      this.player.angle=0;
      this.gravity="y";
    }
    else if(this.SKey.isDown && this.SpaceKey.isDown){
      this.player.setGravityY(-300);
      this.player.setGravityX(0);
      this.player.angle=180;
      this.gravity="y";
    }
  }
}