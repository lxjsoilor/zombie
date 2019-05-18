// 绘制背景
function DrawGameBg(option) {
    this.ctxBg = option.ctxBg;
    this.bgImg = option.bgImg;
    this.init();
};

util.extend(DrawGameBg.prototype, {
    init: function() {
        this.drawBg();
    },
    drawBg: function() {
        this.ctxBg.drawImage(this.bgImg, 0, 0);
    }
})