class Level1 extends Phaser.Scene{
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
    }
}