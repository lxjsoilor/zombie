// 游戏加载特效

function GameLoad(option) {
    this.ctxGameloading = option.ctxGameloading;
    this.loadIngImg = option.loadIngImg;
    this.width = option.width;
    this.height = option.height;
    this.cX = option.cX;
    this.cY = option.cY;
    this.init();
};
util.extend(GameLoad.prototype, {
    init: function() {
        this.ctxGameloading.drawImage(this.loadIngImg, 0, 0);
    },
    drawLoad: function(current, all) {
        this.ctxGameloading.fillStyle = '#ffe5e5';
        this.ctxGameloading.fillRect(this.cX, this.cY, (current / all) * this.width, this.height);
    }
})