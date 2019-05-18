function Role(option) {
    this.ctxRole = option.ctxRole;
    this.roleImg = option.roleImg;
    this.roleCx = option.roleCx;
    this.roleCy = option.roleCy;
    this.roleSpeed = option.roleSpeed || 2;
    this.roleTempSpeed = this.roleSpeed;
    // 玩家个数
    this.player1 = option.player1;
    this.player2 = option.player2;

    this.killRang = option.killRang || config.killRang;

    this.attachTime = config.attachTime; //攻击间隔

    // 人物体质
    this.roleBody = 0.25;

    // 子弹特效图
    // this.bulletImg = option.bulletImg;

    // 监听按键队列
    // 用于存储按键按下的事件，松开拿走会删除对应按键的值
    this.keyListerensPlay1 = {};
    this.keyListerensPlay2 = {};
    // 用于储存人物的方向，根据数组中最后两个值得到人物斜角方向
    this.dire = [];
    // 是否在运动
    this.moving = false;
    // 进行中的子弹
    this.bulletIng = [];
    // 是否死亡
    this.isDie = false;

    // 道具功能部分
    this.nBGun = 0; //机关枪模式
    this.mineNum = 3; //拥有地雷数量
    this.pretend = false; //是否是伪装状态


    // 人物按键移动方向配置
    this.roleTopKey = option.roleTopKey || 87;
    this.roleRightKey = option.roleRightKey || 68;
    this.roleLeftKey = option.roleLeftKey || 65;
    this.rolebottomKey = option.rolebottomKey || 83;


    this.roleX = 0;
    this.roleY = 0;
    this.roleW = this.roleImg.width / 8;
    this.roleH = this.roleImg.height / 8;
    this.roundZombie = 0;
    this.roleIndex = 0;

    // 判断能不能移动
    // this.flag = true;
    this.toTop = false;
    this.toRight = false;
    this.toBottom = false;
    this.toLeft = false;

    // 枪击留下血液'
    this.ctxBlood = option.ctxBlood;
    this.bloodImg = option.bloodImg;
    this.bloodW = this.bloodImg.width / 4;
    this.bloodH = this.bloodImg.height / 8;

    // 僵尸中枪喷血
    this.penBloodImg = option.penBloodImg;
    this.penBloodW = this.penBloodImg.width;
    this.penBloodH = this.penBloodImg.height;


    // 初始化函数
    this.init();
};

util.extend(Role.prototype, {
    init: function() {
        this.roleDraw();
    },
    roleDraw: function() {
        // 边缘限制
        if (this.roleCx < 0) {
            this.roleCx += this.roleSpeed || 0;
        };
        if (this.roleCx > roleCvs.width - 40) {
            this.roleCx -= this.roleSpeed
        }
        if (this.roleCy < 0) {
            this.roleCy += this.roleSpeed || 0;
        };
        if (this.roleCy > roleCvs.height - 40) {
            this.roleCy -= this.roleSpeed || 0;
        };

        // 判断在不在爆炸范围内，在的话去死
        if (ctxGas.isPointInPath(this.roleCx + this.roleW / 2, this.roleCy + this.roleH / 2)) {
            // alert('fuck');
            this.isDie = true;
            this.roleImg = config.RoleDieImg;
        };
        // 判断在不在道具范围内，有的话吃道具
        if (ctxGameProp.isPointInPath(this.roleCx + this.roleW / 2, this.roleCy + this.roleH / 2)) {
            // console.log(this.player1);

            if (this.player1) {
                // console.log(this);
                if (game.propGame.propType == 0) {
                    // 获得10发机关枪
                    this.nBGun += 10;
                } else if (game.propGame.propType == 1) {
                    // var countDown = 5;
                    this.roleSpeed = 4;
                    this.roleTempSpeed = 4;
                    var _this = this;
                    setTimeout(function() {
                        _this.roleSpeed = 2;
                        _this.roleTempSpeed = 2;
                    }, 5000);
                } else if (game.propGame.propType == 3) {
                    this.mineNum += 5;
                } else if (game.propGame.propType == 2) {
                    if (game.role.isDie) {

                    } else {
                        var _this = this;
                        this.pretend = true;
                        this.roleImg = config.imgobj['pretend'];

                        setTimeout(function() {
                            _this.pretend = false;
                            _this.roleImg = config.imgobj['role'];
                        }, 5000);
                    }
                } else if (game.propGame.propType == 4) {
                    if (game.dobuleRole) {
                        // alert(90)
                        // console.log(game.role2.isDie);
                        game.role2.isDie = false;
                        game.role2.roleImg = config.imgobj['role2'];
                    }
                }
            };
            if (this.player2) {
                if (game.propGame.propType == 0) {
                    // 获得10发机关枪
                    this.nBGun += 10;
                } else if (game.propGame.propType == 1) {
                    // var countDown = 5;
                    this.roleSpeed = 4;
                    this.roleTempSpeed = 4;
                    var _this = this;
                    setTimeout(function() {
                        _this.roleSpeed = 2;
                        _this.roleTempSpeed = 2;
                    }, 5000);
                } else if (game.propGame.propType == 4) {
                    this.mineNum += 5;
                } else if (game.propGame.propType == 2) {
                    if (game.role2.isDie) {

                    } else {
                        var _this = this;
                        this.pretend = true;
                        this.roleImg = config.imgobj['pretend'];
                        setTimeout(function() {
                            _this.pretend = false;
                            _this.roleImg = config.imgobj['role2'];
                        }, 5000);
                    }
                } else if (game.propGame.propType == 3) {
                    game.role.isDie = false;
                    game.role.roleImg = config.imgobj['role'];
                }
            }
            // console.log(this.player2);
            // alert(this.player1);

            // 清除道具图层
            ctxGameProp.clearRect(0, 0, gamePropCvs.width, gamePropCvs.height);
            ctxGameProp.beginPath();
        }

        // 图片帧
        if (this.moving) {
            this.roleY = this.roleH * Math.floor(this.roleIndex / 4);
            this.roleIndex++;
            if (this.roleIndex > 31) {
                this.roleIndex = 0;
            };
        };
        this.ctxRole.drawImage(this.roleImg, this.roleX, this.roleY, this.roleW, this.roleH, this.roleCx, this.roleCy, this.roleW, this.roleH);
    },
    clearRole: function() {
        var _this = this;
        util.clearCtx(_this.ctxRole, roleCvs.width, roleCvs.height);
        ctxBullet.clearRect(0, 0, roleCvs.width, roleCvs.height);
        ctxBullet.beginPath();

    },
    shoot: function(dire) {

        if (this.isDie) {
            // console.log('sile')
            return;
        };
        if (config.hasSound) {
            config.audios['buqian'].currentTime = 0;
            config.audios['buqian'].play();
        }
        switch (dire) {
            case 172:
                var x = this.roleCx + this.roleW / 2 + (Math.random() * 6 - 3);
                var y = this.roleCy + (Math.random() * 6 - 3);
                break;
            case 215:
                var x = this.roleCx + this.roleW + (Math.random() * 6 - 3);
                var y = this.roleCy + (Math.random() * 6 - 3);
                break;
            case 258:
                var x = this.roleCx + this.roleW + (Math.random() * 6 - 3);
                var y = this.roleCy + this.roleH / 2 + (Math.random() * 6 - 3);
                break;
            case 301:
                var x = this.roleCx + this.roleW + (Math.random() * 6 - 3);
                var y = this.roleCy + this.roleH + (Math.random() * 6 - 3);
                break;
            case 0:
                var x = this.roleCx + this.roleW / 2 + (Math.random() * 6 - 3);
                var y = this.roleCy + this.roleH + (Math.random() * 6 - 3);
                break;
            case 43:
                var x = this.roleCx + (Math.random() * 6 - 3);
                var y = this.roleCy + this.roleH / 2 + (Math.random() * 6 - 3);
                break;
            case 86:
                var x = this.roleCx + (Math.random() * 6 - 3);
                var y = this.roleCy + this.roleH / 4 + (Math.random() * 6 - 3);
                break;
            case 129:
                var x = this.roleCx + (Math.random() * 6 - 3);
                var y = this.roleCy + (Math.random() * 6 - 3);
                break;
            default:
                break;
        }

        this.bulletIng[this.bulletIng.length] = {
            x: x,
            y: y,
            dire: dire,
            index: 60,
        };

    },
    createBullet: function(zombieArr) {

        this.isShooted(zombieArr);
        this.attachTime++;
        if (this.attachTime >= config.attachTime) {
            this.attachTime = config.attachTime
        };
        if (this.bulletIng.length >= 0) {
            for (var i = 0; i < this.bulletIng.length; i++) {
                var tempBullet = this.bulletFly(this.bulletIng[i].x, this.bulletIng[i].y, this.bulletIng[i].dire, this.bulletIng[i].index, zombieArr);
                if (tempBullet) {
                    this.bulletIng[i] = tempBullet;
                };
            };
        };
    },
    // 子弹飞的过程判断是否中弹打中返回false，打不中返回true；
    isShooted: function(zombieArr, dire) {
        for (var i = 0; i < zombieArr.length; i++) {
            // 僵尸死亡跳过这次判断
            if (zombieArr[i].life < 0) {
                continue;
            };
            // 获取僵尸的中心点
            var x = zombieArr[i].x + this.roleW / 2;
            var y = zombieArr[i].y + this.roleH / 2;
            // 打中僵尸僵尸减少一点生命值并且让僵尸执行后退函数
            if (ctxBullet.isPointInPath(x, y)) {
                zombieArr[i].life--;
                zombieArr[i].backUpTime = 10;
                this.backUp(dire, zombieArr[i], 3, false);

                ctxBullet.beginPath();
                ctxBullet.clearRect(0, 0, 1200, 600);
                return false;
            }

        };
        return true;
    },
    bulletFly: function(x, y, dire, index, zombieArr) {
        var _this = this;
        ctxBullet.beginPath();
        ctxBullet.arc(x, y, this.killRang, 0, Math.PI * 2);
        ctxBullet.closePath();


        // 判断是否该结束这个子弹
        if (index < 0) {
            util.deleObjInArr(_this.bulletIng, {
                x: x,
                y: y,
                dire: dire,
                index: index,
            });
            return;
        };
        // 僵尸中弹结束子弹
        var isSoot = this.isShooted(zombieArr, dire);
        if (!isSoot) {
            util.deleObjInArr(_this.bulletIng, {
                x: x,
                y: y,
                dire: dire,
                index: index,
            });
            return;
        };
        // 子弹碰到汽油桶
        for (var i = 0; i < config.bombArr[config.checked].length; i++) {
            var bomb = config.bombArr[config.checked][i];
            if (!bomb.isBomb) {
                var bombX = bomb.x;
                var bombY = bomb.y;
                if (ctxBullet.isPointInPath(bombX, bombY)) {
                    util.deleObjInArr(_this.bulletIng, {
                        x: x,
                        y: y,
                        dire: dire,
                        index: index,
                    });
                    bomb.isBomb = true;
                    game.gas.drawBombScope(bombX, bombY);
                    return;
                }
            }
        };

        // 墙壁中弹结束子弹
        if (util.isObstacle(ctxObstacle, x, y)) {
            util.deleObjInArr(_this.bulletIng, {
                x: x,
                y: y,
                dire: dire,
                index: index,
            });

            return;
        }
        index--;

        // 根据方向得到子弹怎么飞;

        switch (dire) {
            case 172:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg.width, bulletObj.bulletImg.height);
                y -= 14;
                ctxBullet.drawImage(bulletObj.bulletImg, x, y);
                break;
            case 215:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg2.width, bulletObj.bulletImg2.height);
                x += 14;
                y -= 14;
                ctxBullet.drawImage(bulletObj.bulletImg2, x, y);
                break;
            case 258:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg3.width, bulletObj.bulletImg3.height);
                x += 14;
                ctxBullet.drawImage(bulletObj.bulletImg3, x, y);
                break;
            case 301:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg4.width, bulletObj.bulletImg4.height);
                x += 14;
                y += 14;
                ctxBullet.drawImage(bulletObj.bulletImg4, x, y);
                break;
            case 0:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg5.width, bulletObj.bulletImg5.height);
                y += 14;
                ctxBullet.drawImage(bulletObj.bulletImg5, x - this.roleW / 4, y);
                break;
            case 43:
                ctxBullet.clearRect(x, y - this.roleH / 2, bulletObj.bulletImg6.width, bulletObj.bulletImg6.height);
                x -= 14;
                y += 14;
                ctxBullet.drawImage(bulletObj.bulletImg6, x, y - this.roleH / 2);
                break;
            case 86:
                ctxBullet.clearRect(x, y - this.roleH / 5, bulletObj.bulletImg7.width, bulletObj.bulletImg7.height);
                x -= 14;
                ctxBullet.drawImage(bulletObj.bulletImg7, x, y - this.roleH / 5);
                break;
            case 129:
                ctxBullet.clearRect(x, y, bulletObj.bulletImg8.width, bulletObj.bulletImg8.height);
                y -= 14;
                x -= 14;
                ctxBullet.drawImage(bulletObj.bulletImg8, x, y);
                break;
            default:
                break;
        };


        return {
            x: x,
            y: y,
            dire: dire,
            index: index
        };

    },
    backUp: function(dire, obj, backStep, isBomb) {
        var _this = this;
        // 喷血方向

        switch (dire) {
            case 0:
                var angle = Math.PI * (Math.random() * 45 + 67.5 + 180) / 180;
                break;
            case 43:
                var angle = Math.PI * (Math.random() * 45 + 112.5 + 180) / 180;
                break;
            case 86:
                var angle = Math.PI * (Math.random() * 45 + 157.5 + 180) / 180;
                break;
            case 129:
                var angle = Math.PI * (Math.random() * 45 + 202.5 + 180) / 180;
                break;
            case 172:
                var angle = Math.PI * (Math.random() * 45 + 247.5 + 180) / 180;
                break;
            case 215:
                var angle = Math.PI * (Math.random() * 45 + 292.5 + 180) / 180;
                break;
            case 258:
                var angle = Math.PI * (Math.random() * 45 + 337.5 + 180) / 180;
                break;
            case 301:
                var angle = Math.PI * (Math.random() * 45 + 382.5 + 180) / 180;
                break;
            default:
                break;
        }
        // 递归动画
        function backUp2() {
            obj.backUpTime--;
            if (isBomb) {
                switch (dire) {
                    case 0:
                        obj.x = obj.x;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.y = obj.y + backStep;
                        };
                        break;
                    case 1:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                            obj.y = obj.y + backStep;
                        };
                        break;
                    case 2:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                        };
                        break;
                    case 3:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 4:
                        obj.x = obj.x;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 5:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 6:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                        };
                        break;
                    case 7:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                            obj.y = obj.y + backStep;
                        };
                        break;
                    default:
                        break;
                };
            } else {
                switch (dire) {
                    case 172:
                        obj.x = obj.x;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.y = obj.y + backStep;
                        };
                        break;
                    case 215:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                            obj.y = obj.y + backStep;
                        };
                        break;
                    case 258:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                        };
                        break;
                    case 301:
                        obj.x = obj.x + backStep;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x - backStep;
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 0:
                        obj.x = obj.x;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 43:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y + backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                            obj.y = obj.y - backStep;
                        };
                        break;
                    case 86:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                        };
                        break;
                    case 129:
                        obj.x = obj.x - backStep;
                        obj.y = obj.y - backStep;
                        if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                            obj.x = obj.x + backStep;
                            obj.y = obj.y + backStep;
                        };
                        break;
                    default:
                        break;
                };
                // 绘制中枪喷血效果
                _this.drawPenBlood(obj, dire, angle);
            };
            if (obj.backUpTime > 0) {
                window.requestAnimationFrame(backUp2);
            } else {
                obj.backUpTime = 0;
                ctxButer.clearRect(0, 0, roleCvs.width, roleCvs.height);
                // obj.life = -1;
            }
            _this.drawBlood(dire, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2);
        };
        backUp2();
        obj.zombieIndex = 0;
    },
    // 绘制僵尸留下的血液
    drawBlood: function(dire, x, y) {
        var index = Math.floor(Math.random() * 8);
        // 攻击方向
        if (dire == 172 || dire == 0) {
            var bloodDire = 3;
        } else if (dire == 43 || dire == 215) {
            var bloodDire = 1;
        } else if (dire == 86 || dire == 258) {
            var bloodDire = 0;
        } else if (dire == 129 || dire == 301) {
            var bloodDire = 2;
        };
        // 炸弹方向
        if (dire == 0 || dire == 4) {
            var bloodDire = 3;
        } else if (dire == 1 || dire == 5) {
            var bloodDire = 1;
        } else if (dire == 2 || dire == 6) {
            var bloodDire = 0;
        } else if (dire == 3 || dire == 7) {
            var bloodDire = 2;
        };


        this.ctxBlood.drawImage(this.bloodImg, this.bloodW * bloodDire, this.bloodH * index, this.bloodW, this.bloodH, x - this.bloodW / 2, y - this.bloodH / 2 + this.roleH / 4, this.bloodW, this.bloodH);
    },
    drawPenBlood: function(obj, dire, angle) {

        ctxButer.save();
        ctxButer.clearRect(0, 0, roleCvs.width, roleCvs.height);
        ctxButer.translate(obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2);
        ctxButer.rotate(angle);

        ctxButer.drawImage(this.penBloodImg, 0, 0, this.penBloodW, this.penBloodH, -this.penBloodW / 2, -this.penBloodH / 2, this.penBloodW, this.penBloodH);
        ctxButer.restore();
    },



})