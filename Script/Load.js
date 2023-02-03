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
        });
    }

    create(){
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player",{start:0,end:1}),
            frameRate:6,
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player",{
                start:4,
                end:3
            }),
            frameRate:6,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player",{
                start:2,
                end:2
            }),
            frameRate:6,
        });

    }

    update(){
        this.scene.switch('Level');
    }
}