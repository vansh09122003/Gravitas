class Load extends Phaser.Scene{
    constructor(){
        super('load')
    }

    preload(){
        this.load.image("background", "Assets/Background.png");
        this.load.image("block1", "Assets/Block.png");
        this.load.image("block2", "Assets/Block_stretched.png");
        this.load.image("hole","Assets/Warm_Hole.png");
        this.load.image("play","Assets/UI/Play.png");
        this.load.image("pause","Assets/UI/Pause.png");
        this.load.image("menu","Assets/UI/Menu.png");
        this.load.image("reload","Assets/UI/Reload.png");
        this.load.image("inGameMenu","Assets/UI/In_Game_Menu.png");
        this.load.image("uiButtons","Assets/UI/UI_Buttons.png");
        playerSprite=this.load.spritesheet("player", "Assets/player.png", {
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