function GameOver(option) {
    this.ctxGameOver = option.ctxGameOver;
    this.gameOverImg = option.gameOverImg;
    // this.
    this.init();
};
util.extend(GameOver.prototype, {
    init: function() {
        gameOverCvs.style.display = 'none';
        this.drawGameOver();
        this.event();
        // this.drawText();
    },
    drawGameOver: function() {
        this.ctxGameOver.drawImage(this.gameOverImg, 0, 0);
    },

    event: function() {
        var _this = this;
        gameOverCvs.onclick = function(e) {
            e.stopPropagation();
            if (config.hasSound) {
                config.audios['enter'].play();
            };
            // console.log(9);
            // window.location.reload();
            game.gameOverLogic();
        };
    },

});