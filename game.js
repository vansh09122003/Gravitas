var config = {
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, StartScreen, Level1, Level2,Level3,Level4, Level5, Level6, Level7, Level8],
}
var playerSprite;
var playBtn,pauseBtn,reloadBtn,menuBtn;
var inGameMenuBg;
var lvl;
var game = new Phaser.Game(config);