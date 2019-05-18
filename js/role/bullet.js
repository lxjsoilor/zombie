function Bullet(x, y, dire) {
    this.x = x;
    this.y = y;
    this.dire = dire;

};
util.extend(Bullet.prototype, {
    bulletFly: function(x, y, dire) {
        ctxBullet.arc(x, y, this.killRang, 0, Math.PI * 2);
        ctxBullet.closePath();
        ctxBullet.fill();
        // 根据方向得到子弹怎么飞;
        switch (dire) {
            case 172:
                ctxBullet.clearRect(x, y, _this.bulletImg.width, _this.bulletImg.height);
                y -= 14;
                ctxBullet.drawImage(_this.bulletImg, x, y);
                break;
            case 215:
                ctxBullet.clearRect(x, y, _this.bulletImg2.width, _this.bulletImg2.height);
                x += 14;
                y -= 14;
                ctxBullet.drawImage(_this.bulletImg2, x, y);
                break;
            case 258:
                ctxBullet.clearRect(x, y, _this.bulletImg3.width, _this.bulletImg3.height);
                x += 14;
                ctxBullet.drawImage(_this.bulletImg3, x, y);
                break;
            case 301:
                ctxBullet.clearRect(x, y, _this.bulletImg4.width, _this.bulletImg4.height);
                x += 14;
                y += 14;
                ctxBullet.drawImage(_this.bulletImg4, x, y);
                break;
            case 0:
                ctxBullet.clearRect(x, y, _this.bulletImg5.width, _this.bulletImg5.height);
                y += 14;
                ctxBullet.drawImage(_this.bulletImg5, x, y);
                break;
            case 43:
                ctxBullet.clearRect(x, y - _this.roleH / 2, _this.bulletImg6.width, _this.bulletImg6.height);
                x -= 14;
                y += 14;
                ctxBullet.drawImage(_this.bulletImg6, x, y - _this.roleH / 2);
                break;
            case 86:
                ctxBullet.clearRect(x, y - _this.roleH / 5, _this.bulletImg7.width, _this.bulletImg7.height);
                x -= 14;
                ctxBullet.drawImage(_this.bulletImg7, x, y - _this.roleH / 5);
                break;
            case 129:
                ctxBullet.clearRect(x, y, _this.bulletImg8.width, _this.bulletImg8.height);
                y -= 14;
                x -= 14;
                ctxBullet.drawImage(_this.bulletImg8, x, y);
                break;
            default:
                break;
        };
    },
    createBullet: function() {
        if (this.bulletIng.length > 0) {
            for (var i = 0; i < this.bulletIng.length; i++) {
                this.bulletIng[i]
            };
        }
    }
})