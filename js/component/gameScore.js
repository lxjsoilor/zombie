function GameScroe(option) {
    this.ctxGameScore = option.ctxGameScore;

    this.startImg = option.startImg;
    this.stopImg = option.stopImg;
    this.restartImg = option.restartImg;
    this.bg_musicImg = option.bg_musicImg;
    this.soundImg = option.soundImg;
    this.sound2Img = option.sound2Img;
    this.bg_music2Img = option.bg_music2Img;
    this.init();
};
util.extend(GameScroe.prototype, {
    init: function() {

        this.drawPause();
        this.drawMusic();
        this.drawSound();
        this.drawReStart();
        this.event();
        var _this = this;
        setInterval(function() {
            _this.drawScroe(config.tempsIndex + '')
        }, 1000)

    },
    drawScroe: function(text) {
        ctxGameScore.clearRect(502, 0, 230, 70);
        var tempArr = ['0', '0', '0', '0', '0', '0'];
        var newTextArr = text.split('').reverse();
        for (var i = 0; i < newTextArr.length; i++) {
            tempArr[tempArr.length - i - 1] = newTextArr[i]
        };
        var textStr = tempArr.join('');
        ctxGameScore.font = "900 60px 微软雅黑";
        ctxGameScore.fillStyle = '#fff';
        ctxGameScore.lineWidth = 2;
        ctxGameScore.strokeStyle = '#000';
        ctxGameScore.fillText(textStr, 502, 60);
        ctxGameScore.strokeText(textStr, 502, 60);
    },
    drawPause: function(isPause) {
        if (isPause) {
            this.ctxGameScore.drawImage(this.startImg, 0, 0, 66, 66, 356, 2, 66, 66);
        } else {
            this.ctxGameScore.drawImage(this.stopImg, 0, 0, 66, 66, 356, 2, 66, 66);
        }
    },
    drawMusic: function(hasMusic) {
        if (hasMusic) {
            this.ctxGameScore.drawImage(this.bg_music2Img, 0, 0, 66, 66, 735, 2, 66, 66);

        } else {
            this.ctxGameScore.drawImage(this.bg_musicImg, 0, 0, 66, 66, 735, 2, 66, 66);
        }
    },
    drawSound: function(hasSound) {
        if (hasSound) {
            this.ctxGameScore.drawImage(this.sound2Img, 0, 0, 66, 66, 809, 2, 66, 66);

        } else {
            this.ctxGameScore.drawImage(this.soundImg, 0, 0, 66, 66, 809, 2, 66, 66);

        }
    },
    drawReStart: function() {
        this.ctxGameScore.drawImage(this.restartImg, 0, 0, 66, 66, 429, 2, 66, 66);

    },
    event: function() {
        var _this = this;
        gameScoreCvs.onclick = function(e) {
            e.stopPropagation();
            // console.log(90);
            if (config.hasSound) {
                config.audios['enter'].play();
            };
            if (e.offsetY > 2 && e.offsetY < 68) {
                if (e.offsetX > 429 && e.offsetX < 495) {
                    // 重新开始
                    game.gameOverLogic();
                };
                if (e.offsetX > 356 && e.offsetX < 422) {
                    // 暂停
                    game.pause();
                    _this.drawPause(game.isPause);
                };
                if (e.offsetX > 809 && e.offsetX < 875) {
                    // 音效
                    config.hasSound = !config.hasSound;
                    // config.hasSound = false;
                    _this.drawSound(!config.hasSound);
                };
                if (e.offsetX > 735 && e.offsetX < 801) {
                    // 音乐
                    config.hasMusic = !config.hasMusic;
                    // config.hasMusic = false;
                    if (!config.hasMusic) {
                        // config.audios['bkg'].loop = true;
                        config.audios['bkg'].pause();
                    } else {
                        config.audios['bkg'].loop = true;
                        config.audios['bkg'].play();
                    }
                    _this.drawMusic(!config.hasMusic);
                }

            };

        };

    }
})