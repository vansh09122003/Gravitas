class Level extends Phaser.Scene{
    constructor(){
        super('Level')
    }

    create(){
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background").setInteractive();
        this.background.setOrigin(0,0);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 150, 'block2').setScale(2.75,0.65).refreshBody().setInteractive();
        this.platforms.create(960, 360, 'block2').setScale(1.2, 0.65).refreshBody().setInteractive();
        this.platforms.create(600, 700, 'block2').setScale(2.2, 1).refreshBody().setInteractive();
        this.platforms.create(220, 700, 'block2').setScale(0.35, 4.7).refreshBody().setInteractive();

        this.player = this.add.sprite(220, 70, "player").setScale(0.75);
    }
}