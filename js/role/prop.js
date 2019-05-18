function GameProp(option) {
    this.ctxGameProp = option.ctxGameProp;
    this.propImg = option.propImg;
    // console.log(this.propImg);
    this.propImgW = this.propImg.width;
    this.propImgH = this.propImg.height / 5;

    // this.
    this.propType; //道具类型
    // this.drawProp();
};
util.extend(GameProp.prototype, {
    drawProp: function() {
        this.propType = Math.floor(Math.random() * 5);

        // this.propType = 4;
        if (!game.dobuleRole && this.propType == 4) {
            // this.propType = Math.floor(Math.random() * 4);
            this.propType = 3;

        };
        if (game.dobuleRole && this.propType == 4) {
            if (game.role.isDie || game.role2.isDie) {} else {
                this.propType = Math.floor(Math.random() * 4);
            }
        }
        var x = Math.random() * 1200;
        var y = Math.random() * 600;
        while (ctxObstacle.isPointInPath(x, y)) {
            x = Math.random() * 1200;
            y = Math.random() * 600;
            // console.count();
            console.log(90);

        };
        // alert(90);
        ctxGameProp.beginPath();
        ctxGameProp.clearRect(0, 0, gamePropCvs.width, gamePropCvs.height);

        ctxGameProp.drawImage(this.propImg, 0, this.propImgH * this.propType, this.propImgW, this.propImgH, x - this.propImgW / 2, y - this.propImgH / 2, this.propImgW, this.propImgH)
        ctxGameProp.arc(x, y, 20, 0, Math.PI * 2);
        // ctxGameProp.fill();
        ctxGameProp.closePath();
    }
})