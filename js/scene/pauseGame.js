function PauseGame(option) {
    this.ctxPauseGame = option.ctxPauseGame;
    this.globalAlpha = option.globalAlpha || 0.8;
    this.init();

};
util.extend(PauseGame.prototype, {
    init: function() {
        pauseGameCvs.style.display = 'none';
        this.ctxPauseGame.globalAlpha = this.globalAlpha;
        this.drawPause();
    },
    drawPause: function() {
        this.ctxPauseGame.fillRect(0, 0, pauseGameCvs.width, pauseGameCvs.height);
    },

});