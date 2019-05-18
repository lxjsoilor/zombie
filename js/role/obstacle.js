function Obstacle(option) {
    this.ctxObstacle = option.ctxObstacle;
    this.obstacleImg = option.obstacleImg;

    this.init();
};

util.extend(Obstacle.prototype, {
    init: function() {
        this.drawObstacle();
    },
    drawObstacle: function() {
        this.ctxObstacle.clearRect(0, 0, obstacleCvs.width, obstacleCvs.height);
        this.ctxObstacle.beginPath();
        this.ctxObstacle.drawImage(this.obstacleImg, 0, 0);

        for (var i = 0; i < config.obstacle[config.checked].length; i++) {
            var element = config.obstacle[config.checked][i];
            this.ctxObstacle.rect(element.x, element.y, element.w, element.h);
            // this.ctxObstacle.fill();
        }
    },
})