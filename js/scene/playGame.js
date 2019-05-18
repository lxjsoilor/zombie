function PlayGame(option) {
    this.ctxPlayGame = option.ctxPlayGame;
    this.playGameImg = option.playGameImg;
    this.playGameImg2 = option.playGameImg2;
    this.init();
};
util.extend(PlayGame.prototype, {
    init: function() {
        this.drawPlayGame();
        this.event();
    },
    drawPlayGame: function() {
        this.ctxPlayGame.drawImage(this.playGameImg, 0, 0);
    },
    event: function() {
        var _this = this;
        playGameCvs.onmousemove = function(e) {
            e.stopPropagation();
            if (e.offsetX > 315 && e.offsetX < 553 && e.offsetY > 277 && e.offsetY < 359) {
                _this.ctxPlayGame.clearRect(0, 0, playGameCvs.width, playGameCvs.height);
                _this.ctxPlayGame.drawImage(_this.playGameImg2, 0, 0);
            } else {
                _this.ctxPlayGame.clearRect(0, 0, playGameCvs.width, playGameCvs.height);
                _this.ctxPlayGame.drawImage(_this.playGameImg, 0, 0);
            }
        }
        playGameCvs.onclick = function(e) {
            e.stopPropagation();
            if (config.hasSound) {
                config.audios['enter'].play();
            };
            if (e.offsetX > 315 && e.offsetX < 553 && e.offsetY > 277 && e.offsetY < 359) {
                playGameCvs.style.display = 'none';
            }
        }
    }
})