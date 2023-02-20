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
var playerSprite;
var startHoleAnim;
var playBtn,pauseBtn,reloadBtn,menuBtn;
var inGameMenuBg;
var lvl;
var game = new Phaser.Game(config);