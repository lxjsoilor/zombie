function CheckGame(option) {
    this.ctxCheckGame = option.ctxCheckGame;
    this.check_view = option.check_view;
    this.check_view_top = option.check_view_top;
    this.check_view_bottom = option.check_view_bottom;
    // console.log(this.check_view_top);

    this.check1 = option.check1;
    this.check2 = option.check2;
    this.check3 = option.check3;
    this.check4 = option.check4;
    this.check5 = option.check5;
    // console.log(this.check5);
    this.check6 = option.check6;
    this.check7 = option.check7;
    this.check8 = option.check8;
    this.single = option.single;
    this.double = option.double;

    this.temp = null;
    this.callbackIn = option.callbackIn;
    // this.callback = function() {
    //     this.callbackIn();
    // };
    this.init();
};

util.extend(CheckGame.prototype, {
    init: function() {
        this.drawCheckGame(this.check_view_top, 0, 0);
        this.drawCheckGame(this.check_view_bottom, 0, 421);
        this.event();
    },
    drawCheckGame: function(img, cx, cy) {
        this.ctxCheckGame.drawImage(img, cx, cy);
    },
    event: function(e) {
        var _this = this;
        checkGameCvs.onclick = function(e) {
            if (config.hasSound) {
                config.audios['enter'].play();
            };
            e.stopPropagation();
            // 1-4关卡
            if (e.offsetY > 153 && e.offsetY < 277) {
                // console.log(90);
                // 关卡1
                if (e.offsetX > 250 && e.offsetX < 414) {
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check1, 243, 143);
                    config.checked = 0;
                };
                // 关卡2
                if (e.offsetX > 428 && e.offsetX < 592) {
                    // console.log(22222)
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check2, 421, 143);
                    config.checked = 1;
                };
                // 关卡3
                if (e.offsetX > 607 && e.offsetX < 771) {
                    // console.log(33333333)
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check3, 600, 143);
                    config.checked = 2;
                };
                // 关卡4
                if (e.offsetX > 785 && e.offsetX < 949) {
                    // console.log(44444444);
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check4, 778, 143);
                    config.checked = 3;
                }
            };
            // 5-6关卡
            if (e.offsetY > 290 && e.offsetY < 414) {
                // console.log(90);
                // 关卡1
                if (e.offsetX > 250 && e.offsetX < 414) {
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check5, 243, 281);
                    config.checked = 4;
                };
                // 关卡2
                if (e.offsetX > 428 && e.offsetX < 592) {
                    // console.log(22222)
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check6, 421, 281);
                    config.checked = 5;
                };
                // 关卡3
                if (e.offsetX > 607 && e.offsetX < 771) {
                    // console.log(33333333)
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check7, 600, 281);
                    config.checked = 6;

                };
                // 关卡4
                if (e.offsetX > 785 && e.offsetX < 949) {
                    // console.log(44444444);
                    _this.ctxCheckGame.clearRect(0, 0, checkGameCvs.width, checkGameCvs.height - 179);
                    _this.drawCheckGame(_this.check_view_top, 0, 0);
                    _this.drawCheckGame(_this.check8, 778, 281);
                    config.checked = 7;

                }
            };
            if (e.offsetX > 547 && e.offsetX < 725) {
                // 单人
                if (e.offsetY > 445 && e.offsetY < 499) {
                    checkGameCvs.style.display = 'none';
                    // 开始游戏
                    game.isGameOver = false;
                    clearInterval(config.temps);
                    config.temps = setInterval(function() {
                        config.tempsFn();
                    }, 1000);
                    // console.log(config.temps);
                    config.dobuleRole = false;
                    // _this.callback();
                    game.process();
                    game.render();
                };
                // 双人
                if (e.offsetY > 502 && e.offsetY < 556) {
                    checkGameCvs.style.display = 'none';
                    game.isGameOver = false;
                    clearInterval(config.temps);
                    config.temps = setInterval(function() {
                        config.tempsFn();
                    }, 1000);
                    config.dobuleRole = true;
                    // _this.callback();
                    game.process();
                    game.render();

                }
            };
            // 返回
            if (e.offsetX > 66 && e.offsetX < 333 && e.offsetY > 0 && e.offsetY < 98) {
                // console.log('go back')
                if (config.hasSound) {
                    config.audios['enter'].play();
                };
                playGameCvs.style.display = 'block';
            };
        };
        checkGameCvs.onmousemove = function(e) {
            e.stopPropagation();
            if (e.offsetX > 547 && e.offsetX < 725) {
                // 单人
                if (e.offsetY > 446 && e.offsetY < 500) {
                    // console.log('single')
                    _this.ctxCheckGame.clearRect(0, 421, checkGameCvs.width, checkGameCvs.height - 421);
                    _this.drawCheckGame(_this.check_view_bottom, 0, 421);
                    _this.drawCheckGame(_this.single, 459, 446);
                };
                // 双人
                if (e.offsetY > 502 && e.offsetY < 556) {
                    // console.log('dobule');

                    _this.ctxCheckGame.clearRect(0, 421, checkGameCvs.width, checkGameCvs.height - 421);
                    _this.drawCheckGame(_this.check_view_bottom, 0, 421);
                    // _this.drawCheckGame(_this.single, 501, 409);
                    _this.drawCheckGame(_this.double, 459, 502);
                }
            }
        }
    },
    // 回调开始游戏
    // callback: function() {

    // }
})