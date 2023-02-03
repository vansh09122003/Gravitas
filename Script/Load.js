class Load extends Phaser.Scene{
    constructor(){
        super('load')
    }

    preload(){
        this.load.image("background", "Assets/Background.png");
        this.load.image("block1", "Assets/Block.png");
        this.load.image("block2", "Assets/Block_stretched.png");
        this.load.spritesheet("player", "Assets/player.png", {
            frameHeight:96,
            frameWidth:52
        });
        this.load.spritesheet("enemy", "Assets/enemy.png", {
            frameHeight:256,
            frameWidth:256
        })
    }

    update(){
            this.scene.switch('Level')
    }
}