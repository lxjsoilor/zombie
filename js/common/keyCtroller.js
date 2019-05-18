function KeyCtroller(role, top, right, bottom, left) {
    this.keyListerensPlay1 = {};
    // this.keyListerensPlay2 = {};
    this.role = role;
    this.top = top || 87;
    this.right = right || 68;
    this.bottom = bottom || 83;
    this.left = left || 65;


    // 判断能不能移动
    // this.flag = true;
    this.key87 = true;
    this.key83 = true;
    this.key65 = true;
    this.key68 = true;

    this.key38 = true;
    this.key37 = true;
    this.key40 = true;
    this.key39 = true;

    this.keyTop = true;
    this.keyRight = true;
    this.keyBottom = true;
    this.keyLeft = true;

    this.dire = [];
    this.init();
};
util.extend(KeyCtroller.prototype, {
    init: function() {
        this.event();
    },
    event: function() {
        var _this = this;
        document.addEventListener('keydown', function(e) {

            var key = e.keyCode;
            if (_this.role.player1) {
                if (!game.role.isDie) {
                    if (key == 81) {
                        if (game.role.mineNum > 0) {
                            game.role.mineNum--;
                            game.mineProp.mineArr.push({
                                timing: 4,
                                x: game.role.roleCx + game.role.roleW / 2,
                                y: game.role.roleCy + game.role.roleH / 2,
                            });
                            game.mineProp.timingDraw();
                        }
                        // alert('放地雷');
                    };
                }
            }
            if (_this.role.player2) {
                if (!game.role2.isDie) {
                    if (key == 222) {
                        if (game.role2.mineNum > 0) {
                            game.role2.mineNum--;
                            game.mineProp.mineArr.push({
                                timing: 4,
                                x: game.role2.roleCx + game.role2.roleW / 2,
                                y: game.role2.roleCy + game.role2.roleH / 2,
                            });
                            game.mineProp.timingDraw();
                        }
                    }
                }
            }
            _this.keyListerensPlay1[key] = key;
            // };
            _this.roleMove();
            // 触发移动函数

            // 空格健子弹射击
            if (key == 32) {
                if (_this.role.player1) {
                    if (_this.role.attachTime == config.attachTime) {
                        // _this.role.pretend = true;

                        _this.role.shoot(_this.role.roleX);
                        if (_this.role.nBGun > 0) {
                            var index1 = 5;
                            _this.role.nBGun--;
                            var timer = setInterval(function() {
                                index1--;
                                _this.role.shoot(_this.role.roleX);
                                if (index1 <= 0) {
                                    clearInterval(timer)
                                }
                            }, 60)
                        }
                        _this.role.attachTime = 0;
                    };
                };
            };
            if (key == 13) {
                if (_this.role.player2) {
                    if (_this.role.attachTime == config.attachTime) {
                        // _this.role.pretend = true;
                        _this.role.shoot(_this.role.roleX);
                        if (_this.role.nBGun > 0) {
                            var index2 = 5;
                            _this.role.nBGun--;
                            var timer = setInterval(function() {
                                index2--;
                                if (index2 <= 0) {
                                    clearInterval(timer)
                                }
                            }, 60)
                        }
                        _this.role.attachTime = 0;
                    }
                }
            }
        });
        // 人物移动
        // 松开键盘

        document.addEventListener('keyup', function(e) {
            var key = e.keyCode;
            // 松开键盘取消移动
            if (key == _this.top) {
                _this.keyTop = true;
                _this.role.toTop = false;
            };
            if (key == _this.right) {
                _this.keyRight = true;
                _this.role.toRight = false;
            };
            if (key == _this.bottom) {
                _this.keyBottom = true;
                _this.role.toBottom = false;
            };
            if (key == _this.left) {
                _this.keyLeft = true;
                _this.role.toLeft = false;
            };
            delete _this.keyListerensPlay1[key];
            setTimeout(function() {
                var index = _this.dire.indexOf(key);
                // console.log(index);
                if (index > -1) {
                    _this.dire.splice(index, 1);
                }
            }, 80);


        });

        this.roleMove();

    },
    roleMove: function() {
        var flag = true;
        for (var key in this.keyListerensPlay1) {
            if (this.keyListerensPlay1.hasOwnProperty(key)) {
                flag = false;
                if (key == this.top) {
                    // this.role.roleX = this.role.roleW * 4;
                    if (this.keyTop) {
                        this.keyTop = false;
                        this.role.toTop = true;
                        this.dire.push(this.top);
                    }
                };
                if (key == this.right) {
                    // this.role.roleX = this.role.roleW * 6;
                    if (this.keyRight) {
                        this.keyRight = false;
                        this.role.toRight = true;
                        this.dire.push(this.right);
                    }
                };
                if (key == this.bottom) {
                    // this.role.roleX = this.role.roleW * 0;
                    if (this.keyBottom) {
                        this.keyBottom = false;
                        this.role.toBottom = true;
                        this.dire.push(this.bottom);
                    }
                };
                if (key == this.left) {
                    // this.role.roleX = this.role.roleW * 2;
                    if (this.keyLeft) {
                        this.keyLeft = false;
                        this.role.toLeft = true;
                        this.dire.push(this.left);
                    }
                };

            };
        };
    },
    moveStep: function() {
        if (this.role.toTop) {
            this.role.roleCy -= this.role.roleSpeed;
            this.role.roleX = this.role.roleW * 4;
            // console.log(this.isRevers());
            if (this.isRevers()) {
                this.role.roleCy += this.role.roleSpeed;
            };

        };
        if (this.role.toLeft) {
            this.role.roleCx -= this.role.roleSpeed;
            this.role.roleX = this.role.roleW * 2;
            if (this.isRevers()) {
                this.role.roleCx += this.role.roleSpeed;
            };

        };
        if (this.role.toRight) {
            this.role.roleCx += this.role.roleSpeed;
            this.role.roleX = this.role.roleW * 6;
            if (this.isRevers()) {
                this.role.roleCx -= this.role.roleSpeed;
            };

        };
        if (this.role.toBottom) {
            this.role.roleCy += this.role.roleSpeed;
            this.role.roleX = this.role.roleW * 0;
            if (this.isRevers()) {
                this.role.roleCy -= this.role.roleSpeed;
            };
        };


        // 斜角方向
        this.dire = this.dire.slice(-2, this.dire.length);
        if (this.dire != []) {
            if ((this.dire[0] == this.top && this.dire[1] == this.right) || (this.dire[1] == this.top && this.dire[0] == this.right)) {
                this.role.roleX = this.role.roleW * 5;
                // this.role.roleSpeed = this.role.roleSpeed / 2;
            }
            if ((this.dire[0] == this.right && this.dire[1] == this.bottom) || (this.dire[1] == this.right && this.dire[0] == this.bottom)) {
                this.role.roleX = this.role.roleW * 7
            }
            if ((this.dire[0] == this.bottom && this.dire[1] == this.left) || (this.dire[1] == this.bottom && this.dire[0] == this.left)) {
                this.role.roleX = this.role.roleW * 1
            }
            if ((this.dire[0] == this.left && this.dire[1] == this.top) || (this.dire[1] == this.left && this.dire[0] == this.top)) {
                this.role.roleX = this.role.roleW * 3
            }
        }


        // 判断是否该做步伐运动
        this.role.moving = this.dire.length != 0 ? true : false;
    },
    // 判断是否该反方向运动
    isRevers: function() {
        return util.isObstacle(ctxObstacle, this.role.roleCx + this.role.roleW / 2, this.role.roleCy + this.role.roleH / 2);
    }
});