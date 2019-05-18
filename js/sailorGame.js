// 游戏核心

function SailorGame(gameContainer) {
    // 资源列表
    // 音频文件
    this.audioObj = ['bkg', 'enter', 'zhuji', 'buqian', 'baozha-da3'];
    // 图像文件
    this.imgObj = ["play_view", "play_view2", "check_view", "check_view_bottom", "check_view_top", "check1", "check2", "check3", "check4", "check5", "check6", "check7", "check8", "gameOver", "propimg", "pretend", "start", "stop", "restart", "bg_music", "sound", "sound2", "bg_music2", "single", "mine", "mineeffect", "double", "bg_1", "bg_2", "bg_3", "bg_4", "bg_5", "bg_6", "bg_7", "bg_8", "obstacle_1", "obstacle_2", "obstacle_3", "obstacle_4", "obstacle_5", "obstacle_6", "obstacle_7", "obstacle_8", "role", "role2", "roleDie", "zombie", "bullet_1", "bullet_2", "bullet_3", "bullet_5", "bullet_6", "bullet_7", "bullet_8", "bullet_4", "gas", 'bombeffect', 'blood', 'penBlood', 'zomDie'];
    // 暂停开始
    this.playView = null;

    this.checkView = null;

    this.pauseGame = null;

    this.overGame = null;

    this.scroeGame = null;

    this.loadIngGame = null;

    this.propGame = null;
    // 游戏随机道具
    this.mineProp = null;

    this.role = null; //游戏主角1
    this.role2 = null; // 游戏主角2
    this.zombie = null; //僵尸对象
    this.gas = null;
    this.dobuleRole = null; //是否双人游戏

    this.gameBg; //游戏背景

    this.gameObstacle;

    this.roleXY = {}; //存放主角中心坐标
    this.roleCtrl1;
    this.roleCtrl2;

    this.isPause = false;

    this.isGameOver = false;

    // this.author = console.warn('author:\n lxjSailor\n 416596401@qq.com');

    this.gameCount = 1;


}

SailorGame.prototype = {
    constructor: SailorGame,

    run: function() {
        // 开始加载资源
        var _this = this;
        var loadIngGameImg = new Image();
        loadIngGameImg.src = './images/loadIngImg.png';
        loadIngGameImg.onload = function() {
            _this.loadIngGame = new GameLoad({
                ctxGameloading: ctxGameloading,
                loadIngImg: loadIngGameImg,
                width: 350,
                height: 34,
                cX: 425,
                cY: 438,
            });

            // 开始出现游戏加载图片
            // 音频加载
            loadAudio(_this.audioObj, function(audios) {
                // 把音频交给config
                config.audios = audios;
                console.log('音乐加载完毕');
                loadImg(_this.imgObj, function(imgs) {
                    // 对外部提供图片接口
                    config.imgobj = imgs;
                    // console.log(config.imgobj);
                    // console.log('图片加载');

                    // 把子弹图片给全局变量bulletImg；
                    bulletObj.bulletImg = imgs['bullet_1'];
                    bulletObj.bulletImg2 = imgs['bullet_2'];
                    bulletObj.bulletImg3 = imgs['bullet_3'];
                    bulletObj.bulletImg4 = imgs['bullet_4'];
                    bulletObj.bulletImg5 = imgs['bullet_5'];
                    bulletObj.bulletImg6 = imgs['bullet_6'];
                    bulletObj.bulletImg7 = imgs['bullet_7'];
                    bulletObj.bulletImg8 = imgs['bullet_8'];

                    // 绘制游戏开始界面
                    _this.playView = new PlayGame({
                        ctxPlayGame: ctxPlayGame,
                        playGameImg: imgs['play_view'],
                        playGameImg2: imgs['play_view2'],

                    });
                    // 绘制游戏结束界面
                    _this.overGame = new GameOver({
                        ctxGameOver: ctxGameOver,
                        gameOverImg: imgs['gameOver'],
                    });

                    // 绘制游戏暂停遮罩
                    _this.pauseGame = new PauseGame({
                        ctxPauseGame: ctxPauseGame,
                    });

                    // 绘制游戏参数
                    _this.scroeGame = new GameScroe({
                        ctxGameScore: ctxGameScore,

                        startImg: imgs['start'],
                        stopImg: imgs['stop'],
                        restartImg: imgs['restart'],
                        bg_musicImg: imgs['bg_music'],
                        soundImg: imgs['sound'],
                        sound2Img: imgs['sound2'],
                        bg_music2Img: imgs['bg_music2']
                    });

                    // 绘制游戏道具测试
                    _this.propGame = new GameProp({
                        ctxGameProp: ctxGameProp,
                        propImg: imgs['propimg'],
                    });



                    _this.checkView = new CheckGame({
                        ctxCheckGame: ctxCheckGame,
                        check_view: imgs['check_view'],
                        check_view_top: imgs['check_view_top'],
                        check_view_bottom: imgs['check_view_bottom'],
                        check1: imgs['check1'],
                        check2: imgs['check2'],
                        check3: imgs['check3'],
                        check4: imgs['check4'],
                        check5: imgs['check5'],
                        check6: imgs['check6'],
                        check7: imgs['check7'],
                        check8: imgs['check8'],
                        single: imgs['single'],
                        double: imgs['double'],
                        // callbackIn: function() {
                        //     _this.process();
                        // },
                    });
                    // 对外提供死亡人物img
                    config.RoleDieImg = imgs['roleDie'];

                    // 创建游戏背景


                    // 游戏引擎

                    // _this.render();
                })
            });



        };

    },

    process: function() {
        var imgs = config.imgobj;
        this.dobuleRole = config.dobuleRole;
        this.gameBg = new DrawGameBg({
            ctxBg: ctxBg,
            bgImg: imgs[config.gameBg[config.checked][0]],
        });
        // 创建游戏障碍物
        this.gameObstacle = new Obstacle({
            ctxObstacle: ctxObstacle,
            obstacleImg: imgs[config.gameBg[config.checked][1]],
        });
        // createRole(this.role, imgs);
        // 创建主角对象
        this.role = createRole(imgs['role'], 465, 171, true, false, ctxBlood, imgs['blood'], imgs['penBlood']);
        // 添加控制
        this.roleCtrl1 = new KeyCtroller(this.role);
        if (this.dobuleRole) {
            this.role2 = createRole(imgs['role2'], 681, 171, false, true, ctxBlood, imgs['blood'], imgs['penBlood']);
            this.roleCtrl2 = new KeyCtroller(this.role2, 38, 39, 40, 37);
        };
        // 创建僵尸对象
        this.zombie = new Zombie({
            ctxZombie: ctxZombie,
            zombieImg: imgs['zombie'],

            // 死亡僵尸
            ctxZomdie: ctxZomdie,
            zomDieImg: imgs['zomDie'],
        });

        // 创建汽油炸弹
        this.gas = new CreateGas({
            ctxGas: ctxGas,
            gasImg: imgs['gas'],

            bombImg: imgs['bombeffect'],
            bombArr: config.bombArr[config.checked],
            // bombArr: config.bombArr,
        });


        // 创建道具地雷对象
        this.mineProp = new Mine({
            ctxMine: ctxMine,
            mineImg: imgs['mine'],
            mineeffectImg: imgs['mineeffect'],
            ctxGas: ctxGas,
            ctxMineEffect: ctxMineEffect
        });
    },

    render: function() {
        var _this = this;
        // var currentTime = Date.now();
        // this.checkView.callbackIn = function() {
        //     _this.process();
        // };
        // var lastTime = Date.now();
        // 播放背景音乐
        // console.log(90000);
        if (config.hasMusic) {
            config.audios['bkg'].loop = true;
            config.audios['bkg'].play();
        }
        this.isPause = false;
        (function loop() {
            if (_this.isGameOver) {
                return;
            };
            if (!_this.isPause) {
                //判断是否双人

                // 人物绘制前清空图层
                _this.role.clearRole();

                // 绘制人物
                _this.role.init();
                // 重复执行人物移动函数
                _this.roleCtrl1.moveStep();
                // 绘制人物2
                _this.role2 ? _this.role2.init() : '';
                // 重复执行人物移动函数
                _this.role2 ? _this.roleCtrl2.moveStep() : '';

                // 重复绘制子弹
                // _this.bulletFly();
                // 获取僵尸数组传入创建创建子弹函数
                _this.role.createBullet(_this.zombie.zombieArr);
                _this.role2 ? _this.role2.createBullet(_this.zombie.zombieArr) : '';


                // 重复绘制僵尸
                // 获取人物坐标中心点
                if (_this.dobuleRole) {
                    _this.roleXY = {
                        role1: {
                            x: _this.role.roleCx + _this.role.roleW / 2,
                            y: _this.role.roleCy + _this.role.roleH / 2,
                            isDie: _this.role.isDie,
                        },
                        role2: {
                            x: _this.role2.roleCx + _this.role2.roleW / 2,
                            y: _this.role2.roleCy + _this.role2.roleH / 2,
                            isDie: _this.role2.isDie,
                        }
                    };
                } else {
                    _this.roleXY = {
                        role1: {
                            x: _this.role.roleCx + _this.role.roleW / 2,
                            y: _this.role.roleCy + _this.role.roleH / 2,
                            isDie: _this.role.isDie,
                        },
                    };
                }

                // console.clear();
                // console.log(_this.role.isDie);


                // console.log(_this.role2.roundZombie);    
                _this.zombie.zombieMove(_this.roleXY);
                // currentTime = Date.now();
            };

            requestAnimationFrame(loop);
        })()
    },


    pause: function() {
        config.audios['enter'].play();
        this.isPause = !this.isPause;
        if (this.isPause) {
            pauseGameCvs.style.display = 'block';
            clearInterval(config.temps);
            config.temps = null;
        } else {
            pauseGameCvs.style.display = 'none';
            config.temps = setInterval(config.tempsFn, 1000);

        }
    },

    gameOverLogic: function() {
        // 初始化游戏
        game.isGameOver = true;
        game.checkView.callbackIn = null;
        // game.checkView.callbackIn = function() {
        //     game.process();
        // };
        gameOverCvs.style.display = 'none';
        checkGameCvs.style.display = 'block';

        // 初始化游戏人物
        game.role = null;
        game.role2 = null;
        // 初始化键盘事件
        game.roleCtrl1 = null;
        game.roleCtrl2 = null;
        // 初始化时间
        game.scroeGame.drawPause(false);
        pauseGameCvs.style.display = 'none';
        // 初始化僵尸尸体图层
        ctxBlood.clearRect(0, 0, bloodCvs.width, bloodCvs.height);
        ctxZomdie.clearRect(0, 0, dieZombieCvs.width, dieZombieCvs.height);

        clearInterval(config.temps);
        config.temps = null;
        config.tempsIndex = 0;

        // 初始化油桶
        for (var i = 0; i < config.bombArr[config.checked].length; i++) {
            config.bombArr[config.checked][i].isBomb = false;
        };
        config.audios['bkg'].pause();
    }
}