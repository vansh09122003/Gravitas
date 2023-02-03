var config = {
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [Load, Level],
}
var game = new Phaser.Game(config);