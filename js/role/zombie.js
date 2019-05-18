function Zombie(option) {
    this.ctxZombie = option.ctxZombie;
    this.zombieImg = option.zombieImg;

    this.zombieW = this.zombieImg.width / 8;
    this.zombieH = this.zombieImg.height / 9;

    // 死亡僵尸
    this.ctxZomdie = option.ctxZomdie;
    this.zomDieImg = option.zomDieImg;
    this.zomDieW = this.zomDieImg.width;
    this.zomDieH = this.zomDieImg.height / 4;

    this.temp = 0;
    // this.zombieNum = 100;
    this.zombieArr = [];

    this.init();
    this.zombieAttack = [];
};
util.extend(Zombie.prototype, {
    init: function() {
        // this.randomZombie();
        this.createZombie();
        this.drawZombie();
    },
    // 随机产生僵尸

    randomZombie: function() {
        // zombieNum用于限制僵尸数量
        // while (this.zombieNum >= 0) {
        // 随机获取僵尸的出生位置
        var zombieCX = Math.random() > 0.5 ? (Math.floor(Math.random() * 100 - 200)) : (Math.floor(Math.random() * 200 + 1200));
        var zombieCY = Math.floor(Math.random() * 285 + 170);
        this.zombieArr.push({
                x: zombieCX,
                y: zombieCY,
                zombieW: this.zombieImg.width / 8,
                zombieH: this.zombieImg.height / 9,
                index: this.temp++, //僵尸数量
                zomX: 0, //
                zomY: 50, //
                zombieIndex: 1, //僵尸索引
                zombieDire: 1, //僵尸的方向
                life: Math.random() > 0.1 ? 2 : 5, //僵尸生命
                dizziness: 0,
                isDie: false,
                zombieSpeed: Math.random() > 0.1 ? Math.floor(Math.random() * 10 + 8) / 10 : 2.5,
                attack: 150, //攻击倒计时
                backUpTime: 0, //被攻击后后退倒计时
                autoMove: 0, //遇到障碍后进入自动寻路倒计时
                tempSpeed: 0,
                autoW: 0, //自动寻路时候固定相对主角的偏移
                autoH: 0
            })
            // this.zombieNum--;
            // };

    },
    // 按时间创建僵尸
    createZombie: function() {
        var _this = this;
        // var zero = true;
        var frist = true;
        var second = true;
        var third = true;
        var fourth = true;
        var fivth = true;
        config.createZombieTime = setInterval(function() {
            if (game.isPause) {
                // console.log('不会产生僵尸了');
            } else {
                if (config.tempsIndex < 60) {
                    _this.randomZombie()
                };
                // _this.randomZombie()
                // _this.randomZombie()
                if (config.tempsIndex > 30 && frist) {
                    frist = false;
                    for (var i = 0; i < 20; i++) {
                        _this.randomZombie();
                    }
                };
                if (config.tempsIndex > 70 && second) {
                    second = false;
                    for (var i = 0; i < 30; i++) {
                        _this.randomZombie();
                    }
                };
                if (config.tempsIndex > 100 && third) {
                    third = false;
                    for (var i = 0; i < 50; i++) {
                        _this.randomZombie();
                    }
                };
                if (config.tempsIndex > 160 && fourth) {
                    fourth = false;
                    for (var i = 0; i < 100; i++) {
                        _this.randomZombie();
                    };
                };
                if (config.tempsIndex > 240 && fivth) {
                    fivth = false;
                    for (var i = 0; i < 200; i++) {
                        _this.randomZombie();
                    };
                };
            };
            // _this.randomZombie()
        }, 1000)
    },
    // 绘制僵尸

    drawZombie: function() {
        // 绘制之前擦除
        this.ctxZombie.clearRect(0, 0, roleCvs.width, roleCvs.height);


        for (var i = 0; i < this.zombieArr.length; i++) {

            // 绘制僵尸
            if (this.zombieArr[i].life < 0) {
                if (this.zombieArr[i].backUpTime <= 0) {
                    if (this.zombieArr[i].life == -1) {
                        if (this.zombieArr[i].zombieDire == 0 || this.zombieArr[i].zombieDire == 1) {
                            var direIndex = 0;
                        } else if (this.zombieArr[i].zombieDire == 4 || this.zombieArr[i].zombieDire == 5) {
                            var direIndex = 2;
                        } else if (this.zombieArr[i].zombieDire == 2 || this.zombieArr[i].zombieDire == 3) {
                            var direIndex = 3;
                        } else if (this.zombieArr[i].zombieDire == 7 || this.zombieArr[i].zombieDire == 6) {
                            var direIndex = 1;
                        }
                        this.ctxZomdie.drawImage(this.zomDieImg, 0, this.zomDieH * direIndex, this.zomDieW, this.zomDieH, this.zombieArr[i].x, this.zombieArr[i].y, this.zomDieW, this.zomDieH);
                        this.zombieArr[i].life = -2;
                    }
                    continue;
                }
            };
            // 五次时间帧才换图
            this.zombieArr[i].zomY = Math.floor(this.zombieArr[i].zombieIndex / 5) * 50;
            // 移动速度决定步数频率
            var speedHz = Math.abs(this.zombieArr[i].zombieSpeed);
            this.zombieArr[i].zombieIndex += speedHz;
            if (this.zombieArr[i].zombieIndex > 44) {
                this.zombieArr[i].zombieIndex = 5;
            };
            // 僵尸面向决定僵尸精灵图x坐标
            this.zombieArr[i].zomX = this.zombieArr[i].zombieDire * 43;
            this.ctxZombie.drawImage(this.zombieImg, this.zombieArr[i].zomX, this.zombieArr[i].zomY, this.zombieW, this.zombieH, this.zombieArr[i].x, this.zombieArr[i].y, this.zombieW, this.zombieH);

        };
    },
    zombieMove: function(roleXY) {
        // 获取任务坐标并且绘制攻击范围路径
        // console.log(obj);
        var disX1 = roleXY.role1.x;
        var disY1 = roleXY.role1.y;
        if (game.dobuleRole) {
            var disX2 = roleXY.role2.x;
            var disY2 = roleXY.role2.y;
        };
        // console.clear();
        // game.role2.roundZombie++;
        // console.log(game.role2.roundZombie);
        // 绘制僵尸攻击范围路径
        ctxRole.beginPath();
        ctxRole.arc(disX1, disY1, 30, 0, Math.PI * 2);
        ctxRole.closePath();
        ctxRole.arc(disX2, disY2, 30, 0, Math.PI * 2);
        ctxRole.closePath();
        // ctxRole.fillStyle = '#ff0';
        // ctxRole.fill();
        ctxButer.beginPath();
        ctxButer.arc(disX1, disY1, 20, 0, Math.PI * 2);
        ctxButer.closePath();
        ctxButer.arc(disX2, disY2, 20, 0, Math.PI * 2);
        ctxButer.closePath();
        // ctxButer.fillStyle = 'red';
        // ctxButer.fill();


        for (var i = 0; i < this.zombieArr.length; i++) {

            // 判断僵尸是否在炸弹范围内
            if (ctxGas.isPointInPath(this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2) && this.zombieArr[i].life != -1) {
                if (this.zombieArr[i].life >= 0) {
                    this.zombieArr[i].backUpTime = 10;
                    game.role.backUp(this.zombieArr[i].zombieDire, this.zombieArr[i], 3, true);
                    this.zombieArr[i].life = -1;
                }
            }

            // 僵尸死亡不运动
            if (this.zombieArr[i].life < 0) {
                continue;
            };
            // 被攻击的僵尸不运动
            if (this.zombieArr[i].backUpTime > 0) {
                continue;
            };
            // 人物撞击僵尸逻辑
            if (ctxButer.isPointInPath(this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2)) {

                this.zombieArr[i].attack--;
                this.zombieArr[i].zombieSpeed = -Math.abs(this.zombieArr[i].zombieSpeed);


            } else if (ctxRole.isPointInPath(this.zombieArr[i].x + this.zombieW / 2, this.zombieArr[i].y + this.zombieH / 2)) {
                // console.log(90);
                this.zombieArr[i].attack--;
                // this.zombieArr[i].zombieSpeed = -Math.abs(this.zombieArr[i].zombieSpeed);

                // 离谁近给谁加缠身僵尸数量
                var rW1 = this.zombieArr[i].x + this.zombieArr[i].zombieW / 2 - disX1;
                var rH1 = this.zombieArr[i].y + this.zombieArr[i].zombieH / 2 - disY1;

                if (game.dobuleRole) {
                    var rW2 = this.zombieArr[i].x + this.zombieArr[i].zombieW / 2 - disX2;
                    var rH2 = this.zombieArr[i].y + this.zombieArr[i].zombieH / 2 - disY2;
                    var rl1 = rW1 * rW1 + rH1 * rH1;
                    var rl2 = rW2 * rW2 + rH2 * rH2;

                    if (rl1 < rl2) {
                        game.role.roundZombie++;
                        if (game.role.roundZombie >= 12) {
                            game.role.roundZombie = 12;
                        };
                    } else {
                        game.role2.roundZombie++;
                        if (game.role2.roundZombie >= 12) {
                            game.role2.roundZombie = 12;
                        };
                    };
                } else {
                    // console.log(678678);
                    game.role.roundZombie++;
                    if (game.role.roundZombie >= 12) {
                        game.role.roundZombie = 12;
                    };
                }





                if (this.zombieArr[i].attack < 0) {
                    // alert('你的脑子被吃了!!!!!!!!!!');
                    // console.log(this.zombieArr[i].attack);
                    // return;
                    var tempX = game.role.roleCx;
                    var tempY = game.role.roleCy;
                    // console.log(tempX);
                    // console.log(tempY);
                    if (game.role2) {
                        var tempX2 = game.role2.roleCx + game.role.roleW / 2;
                        var tempY2 = game.role2.roleCy + game.role.roleH / 2;
                        // console.log(tempX2, tempY2);
                        // console.log(disX2, disY2);
                        var disW1 = this.zombieArr[i].x + this.zombieArr[i].zombieW / 2 - disX1;
                        var disH1 = this.zombieArr[i].y + this.zombieArr[i].zombieH / 2 - disY1;

                        var disW2 = this.zombieArr[i].x + this.zombieArr[i].zombieW / 2 - disX2;
                        var disH2 = this.zombieArr[i].y + this.zombieArr[i].zombieH / 2 - disY2;
                        // console.log(disW1, disH2);
                        var dis1 = disW1 * disW1 + disH1 * disH1;
                        var dis2 = disW2 * disW2 + disH2 * disH2;

                        if (dis1 < dis2) {
                            game.role.isDie = true;
                            game.role.roleSpeed = game.role.roleTempSpeed;
                            game.role.roleImg = config.RoleDieImg;
                        } else {
                            game.role2.isDie = true;
                            game.role2.roleSpeed = game.role2.roleTempSpeed;
                            game.role2.roleImg = config.RoleDieImg;
                        }
                    } else {
                        game.role.isDie = true;
                        // alert('你们脑子被吃了');
                        game.role.roleImg = config.RoleDieImg;
                        config.drawText(config.tempsIndex + '');
                        clearInterval(config.temps);
                        setTimeout(function() {
                            gameOverCvs.style.display = 'block';
                            game.isPause = true;
                        }, 1000);
                        // alert(config.tempsIndex);
                    }

                    // 判断是那个角色被吃了
                    // 获取这个僵尸到两个角色之间的距离，看看那个近，哪个近哪个死
                    this.zombieArr[i].attack = 150;

                };
                continue;
            };

            // 
            // 恢复僵尸攻击指数
            this.zombieArr[i].attack = 150;
            // 获取僵尸相对于主角方向
            // 判断是否死亡
            if (!roleXY.role1.isDie) {
                var w1 = (this.zombieArr[i].x + this.zombieArr[i].zombieW / 2) - disX1;
                var h1 = (this.zombieArr[i].y + this.zombieArr[i].zombieH / 2) - disY1;
                var l1 = Math.pow((Math.pow(w1, 2) + Math.pow(h1, 2)), 0.5);
            };
            if (roleXY.role1.isDie && !game.dobuleRole) {
                game.role.roleImg = config.RoleDieImg;
                config.drawText(config.tempsIndex + '');
                clearInterval(config.temps);
                setTimeout(function() {
                    gameOverCvs.style.display = 'block';
                    game.isPause = true;
                }, 1000);
            }
            if (game.dobuleRole) {
                if (!roleXY.role2.isDie) {
                    var w2 = (this.zombieArr[i].x + this.zombieArr[i].zombieW / 2) - disX2;
                    var h2 = (this.zombieArr[i].y + this.zombieArr[i].zombieH / 2) - disY2;
                    var l2 = Math.pow((Math.pow(w2, 2) + Math.pow(h2, 2)), 0.5);
                }
            };
            if (game.dobuleRole) {
                if (roleXY.role1.isDie && roleXY.role2.isDie) {
                    // alert('all die');
                    // console.log('all die');
                    clearInterval(config.temps);
                    config.drawText(config.tempsIndex + '');
                    setTimeout(function() {
                        gameOverCvs.style.display = 'block';
                        game.isPause = true;
                    }, 1000);
                    return;

                } else if (roleXY.role1.isDie) {
                    // console.log('角色1死亡');
                    // game.role.
                    var l = l2;
                    var w = w2;
                    var h = h2;
                    if (game.role2.pretend) {
                        var h = 0;
                        var w = 100;
                        var l = 100;
                    }
                } else if (roleXY.role2.isDie) {
                    // console.log('角色2死亡');
                    var l = l1;
                    var w = w1;
                    var h = h1;
                    if (game.role.pretend) {
                        var h = 0;
                        var w = 100;
                        var l = 100;

                    }
                } else {
                    if (l1 < l2) {
                        var l = l1;
                        var w = w1;
                        var h = h1;
                        if (game.role.pretend) {
                            // console.log(90);

                            l = l2;
                            w = w2;
                            h = h2;
                        }
                    } else {
                        var l = l2;
                        var w = w2;
                        var h = h2;
                        if (game.role2.pretend) {
                            l = l1;
                            w = w1;
                            h = h1;
                        }
                    };
                }
            } else {
                var l = l1;
                var w = w1;
                var h = h1;
                if (game.role.pretend) {
                    var h = 0;
                    var w = 100;
                    var l = 100;

                }
            }


            var angle = -Math.asin(h / l) * 180 / Math.PI;
            if (this.zombieArr[i].life < 0) {
                continue;
            };
            // if (this.zombieArr[i].autoMove <= 0) {
            if (this.zombieArr[i].autoMove <= 0) {
                // 根据角度方向设置移动方向
                //up
                // console.log(this.zombieH)
                if (angle < -67.5) {
                    this.zombieArr[i].zombieDire = 4;
                    this.zombieArr[i].y -= this.zombieArr[i].zombieSpeed;
                    // 判断是否撞墙
                    if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                        this.zombieArr[i].y += this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].autoMove = 20;
                        this.zombieArr[i].autoH = h;
                        this.zombieArr[i].autoW = w;
                    }
                };
                //down
                if (angle > 67.5) {
                    this.zombieArr[i].zombieDire = 0;
                    this.zombieArr[i].y += this.zombieArr[i].zombieSpeed;

                    if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                        this.zombieArr[i].y -= this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].autoMove = 20;
                        this.zombieArr[i].autoH = h;
                        this.zombieArr[i].autoW = w;
                    }
                };
                if (angle < 22 && angle > -22) {
                    if (w > 0) {
                        //left
                        this.zombieArr[i].zombieDire = 2;
                        this.zombieArr[i].x -= this.zombieArr[i].zombieSpeed;
                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x += this.zombieArr[i].zombieSpeed;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }
                    };
                    if (w < 0) {
                        //right
                        this.zombieArr[i].zombieDire = 6;
                        this.zombieArr[i].x += this.zombieArr[i].zombieSpeed;

                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x -= this.zombieArr[i].zombieSpeed;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }
                    }
                };
                if (angle < -23 && angle > -67) {
                    //leftup
                    if (w > 0) {
                        this.zombieArr[i].zombieDire = 3;
                        this.zombieArr[i].x -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].y -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;

                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].y += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }
                    };
                    //rightup
                    if (w < 0) {
                        this.zombieArr[i].zombieDire = 5;
                        this.zombieArr[i].x += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].y -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;

                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].y += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }

                    }
                };
                if (angle > 23 && angle < 67) {
                    //lefrdown
                    if (w > 0) {
                        this.zombieArr[i].zombieDire = 1;
                        this.zombieArr[i].x -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].y += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;

                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].y -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }
                    };
                    // rightdown
                    if (w < 0) {
                        this.zombieArr[i].zombieDire = 7;
                        this.zombieArr[i].x += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;
                        this.zombieArr[i].y += Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed;

                        if ((util.isObstacle(ctxObstacle, this.zombieArr[i].x + this.zombieArr[i].zombieW / 2, this.zombieArr[i].y + this.zombieArr[i].zombieH / 2))) {
                            this.zombieArr[i].x -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].y -= Math.pow(2, 0.5) / 2 * this.zombieArr[i].zombieSpeed + 0.5;
                            this.zombieArr[i].autoMove = 20;
                            this.zombieArr[i].autoH = h;
                            this.zombieArr[i].autoW = w;
                        }
                    }
                };
                if ((angle > 22 && angle < 23) || (angle < -22 && angle > -23) || (angle > 67 && angle < 67.5) || (angle < -67 && angle > 67.5)) {
                    this.zombieArr[i].autoMove = 20;
                    this.autoMove(this.zombieArr[i].zombieDire, this.zombieArr[i], this.zombieArr[i].autoW, this.zombieArr[i].autoH = h);
                }
            } else {
                // 进入自动寻路状态
                this.autoMove(this.zombieArr[i].zombieDire, this.zombieArr[i], this.zombieArr[i].autoW, this.zombieArr[i].autoH = h);
            }
            // 被撞开后恢复速度;
            this.zombieArr[i].zombieSpeed = Math.abs(this.zombieArr[i].zombieSpeed);
        };

        // 根据人物周围僵尸数量重新定义人物的行走速度

        if (!game.role.isDie) {
            game.role.roleSpeed = game.role.roleTempSpeed - game.role.roundZombie * game.role.roleBody;
            if (game.role.roleSpeed < 0) {
                game.role.roleSpeed = 0;
            };
        };
        if (game.dobuleRole) {
            if (!game.role2.isDie) {
                game.role2.roleSpeed = game.role2.roleTempSpeed - game.role2.roundZombie * game.role2.roleBody;
                if (game.role2.roleSpeed < 0) {
                    game.role2.roleSpeed = 0;
                };
                game.role2.roundZombie = 0;
            }
        }
        game.role.roundZombie = 0;
        // 绘制僵尸
        this.drawZombie();
    },
    autoMove: function(dire, obj, w, h) {
        if (obj.autoMove == 20) {
            // obj.tempSpeed = obj.zombieSpeed;
            switch (dire) {
                case 0:
                    w > 0 ? obj.zombieDire = 2 : obj.zombieDire = 6;
                    break;
                case 1:
                    obj.zombieDire = 2;
                    break;
                case 2:
                    h > 0 ? obj.zombieDire = 4 : obj.zombieDire = 0;
                    break;
                case 3:
                    obj.zombieDire = 4;
                    break;
                case 4:
                    w > 0 ? obj.zombieDire = 2 : obj.zombieDire = 6;
                    break;
                case 5:
                    obj.zombieDire = 4;
                    break;
                case 6:
                    h > 0 ? obj.zombieDire = 4 : obj.zombieDire = 0;
                    break;
                case 7:
                    obj.zombieDire = 0;
                    break;
                default:
                    break;
            }
        }

        // 根据面向判断移动方向
        obj.autoMove--;
        switch (obj.zombieDire) {
            case 0:
                obj.y += obj.zombieSpeed;
                if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                    obj.y -= obj.zombieSpeed;
                    obj.zombieDire = 4;
                };
                break;
            case 2:
                obj.x -= obj.zombieSpeed;
                if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                    obj.x += obj.zombieSpeed;
                    obj.zombieDire = 6;
                };
                break;
            case 4:
                obj.y -= obj.zombieSpeed;
                if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                    obj.y += obj.zombieSpeed;
                    obj.zombieDire = 0;
                };
                break;
            case 6:
                obj.x += obj.zombieSpeed;
                if (util.isObstacle(ctxObstacle, obj.x + obj.zombieW / 2, obj.y + obj.zombieH / 2)) {
                    obj.x -= obj.zombieSpeed;
                    obj.zombieDire = 2;
                };
                break;
            default:
                break;
        }
    }
})