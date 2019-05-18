function CreateGas(option) {
    this.ctxGas = option.ctxGas;
    this.gasImg = option.gasImg;
    this.bombArr = option.bombArr; //汽油桶位置坐标
    // console.log(this.bombArr);

    this.gasW = this.gasImg.width;
    this.gasH = this.gasImg.height;


    this.bombImg = option.bombImg; //爆炸特效图
    this.bombIndex = 0; //爆炸时间帧
    this.bombW = this.bombImg.width;
    this.bombH = this.bombImg.height / 10;

    this.init();
};

util.extend(CreateGas.prototype, {
    // 绘制汽油炸弹路径图层
    init: function() {
        this.drawGas();
    },
    drawBombScope: function(x, y) {
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
        // this.ctxGas.drawImage(this.gasImg, 0, 0, this.gasW, this.gasH, x - this.gasW / 2, y - this.gasH / 2, this.gasW, this.gasH);
        this.ctxGas.drawImage(this.bombImg, 0, 0, this.bombW, this.bombH, x - this.bombW / 2, y - this.bombH / 2, this.bombW, this.bombH);

        var timer = setInterval(function() {

            index++;
            _this.ctxGas.clearRect(x - _this.bombW / 2, y - _this.bombH / 2, _this.bombW, _this.bombH);
            _this.ctxGas.beginPath();

            _this.ctxGas.drawImage(_this.bombImg, 0, _this.bombH * index, _this.bombW, _this.bombH, x - _this.bombW / 2, y - _this.bombH / 2, _this.bombW, _this.bombH)
            console.log(_this.bombH * index)
            if (index > 10) {
                _this.drawGas();
                clearInterval(timer);
                index = 0;
            }
        }, 50);
        var timerBomb = setInterval(function() {
            var bombx = -Math.floor(Math.random() * 20 + 590);
            var bomby = -Math.floor(Math.random() * 20 + 290);
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

        // 连环爆炸测试
        for (var i = 0; i < this.bombArr.length; i++) {
            if (!this.bombArr[i].isBomb && this.ctxGas.isPointInPath(this.bombArr[i].x, this.bombArr[i].y)) {
                var _this = this;
                _this.bombArr[i].isBomb = true;
                (function(i) {
                    var index = i;
                    setTimeout(function() {
                        _this.drawBombScope(_this.bombArr[index].x, _this.bombArr[index].y);
                    }, 100);
                })(i);

            }
        }

    },

    // 绘制汽油炸弹原型
    drawGas: function() {
        // console.log(this.ctxGas);
        this.ctxGas.clearRect(0, 0, gasCvs.width, gasCvs.height);
        for (var i = 0; i < this.bombArr.length; i++) {
            if (!this.bombArr[i].isBomb) {
                this.ctxGas.drawImage(this.gasImg, this.bombArr[i].x - this.gasW / 2, this.bombArr[i].y - this.gasH / 2);
            }
        }
    },
})