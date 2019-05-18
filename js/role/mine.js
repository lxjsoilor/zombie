function Mine(option) {
    this.mineImg = option.mineImg;
    this.ctxMine = option.ctxMine;

    this.ctxMineEffect = option.ctxMineEffect;

    this.ctxGas = option.ctxGas;


    this.mineImgW = this.mineImg.width;
    this.mineImgH = this.mineImg.height / 4;
    this.mineeffectImg = option.mineeffectImg;
    this.mineeffectImgW = this.mineeffectImg.width;
    this.mineeffectImgH = this.mineeffectImg.height / 10;
    this.mineArr = [];
    this.timer = null;
};

util.extend(Mine.prototype, {
    drawMine: function() {
        var _this = this;
        if (_this.mineArr.length == 0) {
            clearInterval(_this.timer);
        };
        this.ctxMine.clearRect(0, 0, mineCvs.width, mineCvs.height);
        for (var i = 0; i < this.mineArr.length; i++) {
            // if (game.isGameOver) {
            //     clearInterval(this.timer);
            //     this.mineArr = [];
            //     return;
            // }
            if (this.mineArr[i].timing <= 0) {
                // continue;
                this.mineArr[i].timing = 0;
                // 爆炸这个坐标
                this.drawMineScope(this.mineArr[i].x, this.mineArr[i].y);
                // 删除这个坐标
                this.mineArr.shift();
                i -= 1;
                continue;
            };
            // console.log(this.mineArr[i].timing);
            this.mineArr[i].timing--;
            this.ctxMine.drawImage(this.mineImg, 0, (3 - this.mineArr[i].timing) * this.mineImgH, this.mineImgW, this.mineImgH, this.mineArr[i].x - this.mineImgW / 2, this.mineArr[i].y - this.mineImgH / 2, this.mineImgW, this.mineImgH);
        };
    },
    drawMineScope: function(x, y) {
        var index = 0;
        var _this = this;
        // 获取canvas元素
        var canvas = document.getElementsByTagName('canvas');
        if (config.hasSound) {
            config.audios['baozha-da3'].currentTime = 0;
            config.audios['baozha-da3'].play();
        };
        this.ctxGas.arc(x, y, 100, 0, Math.PI * 2);
        this.ctxGas.closePath();
        this.ctxMineEffect.drawImage(this.mineeffectImg, 0, 0, this.mineeffectImgW, this.mineeffectImgH, x - this.mineeffectImgW / 2, y - this.mineeffectImgH / 2, this.mineeffectImgW, this.mineeffectImgH);

        var timer = setInterval(function() {

            index++;
            _this.ctxMineEffect.clearRect(x - _this.mineeffectImgW / 2, y - _this.mineeffectImgH / 2, _this.mineeffectImgW, _this.mineeffectImgH);
            _this.ctxGas.beginPath();
            _this.ctxMineEffect.drawImage(_this.mineeffectImg, 0, _this.mineeffectImgH * index, _this.mineeffectImgW, _this.mineeffectImgH, x - _this.mineeffectImgW / 2, y - _this.mineeffectImgH / 2, _this.mineeffectImgW, _this.mineeffectImgH);
            // _this.drawMine();
            if (index > 10) {
                game.gas.drawGas();
                clearInterval(timer);
            }
        }, 50);
        var timerBomb = setInterval(function() {
            var bombx = -Math.floor(Math.random() * 10 + 595);
            var bomby = -Math.floor(Math.random() * 10 + 295);
            for (var i = 0; i < canvas.length; i++) {
                if (index < 4) {
                    canvas[i].style.marginTop = bomby + 'px';
                    canvas[i].style.marginLeft = bombx + 'px';
                } else {
                    canvas[i].style.marginTop = '-300px';
                    canvas[i].style.marginLeft = '-600px';
                }
            };
            if (index > 4) {
                clearInterval(timerBomb);
            }
        }, 5)
    },
    isNull: function() {
        if (this.mineArr.length == 0) {
            return true;
        };
        return false;
    },
    timingDraw: function() {
        var _this = this;
        if (!this.isNull()) {
            this.drawMine();
            clearInterval(this.timer);
            this.timer = setInterval(function() {
                if (!game.isPause) {
                    _this.drawMine();
                };
            }, 1000)
        }
    }
})