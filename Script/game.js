var config = {
    width: 1280,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Load, Level],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);