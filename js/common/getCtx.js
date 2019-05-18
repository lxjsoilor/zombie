// 获取主角图层

var roleCvs = document.getElementById('roleCvs');
var ctxRole = roleCvs.getContext('2d');

// 绘制子弹图层1
var bulletCvs = document.getElementById('bulletCvs');
var ctxBullet = bulletCvs.getContext('2d');
// 让子弹图层变为全局变量
var bulletObj = {};

// 绘制僵尸图层

var zombieCvs = document.getElementById('zombieCvs');
var ctxZombie = zombieCvs.getContext('2d');


// 背景图层
var bgCvs = document.getElementById('bgCvs');
var ctxBg = bgCvs.getContext('2d');

// 障碍物图层
var obstacleCvs = document.getElementById('obstacleCvs');
var ctxObstacle = obstacleCvs.getContext('2d');

//主角撞击僵尸辅助图层//僵尸中枪喷血辅助图层
var buterCvs = document.getElementById('buterCvs');
var ctxButer = buterCvs.getContext('2d');


// 僵尸尸体图层
var dieZombieCvs = document.getElementById('dieZombieCvs');
var ctxZomdie = dieZombieCvs.getContext('2d');

// 血液图层
var bloodCvs = document.getElementById('bloodCvs');
var ctxBlood = bloodCvs.getContext('2d');

// 汽油炸弹图层
var gasCvs = document.getElementById('gasCvs');
var ctxGas = gasCvs.getContext('2d');

//游戏开始图层
var playGameCvs = document.getElementById('playGameCvs');
var ctxPlayGame = playGameCvs.getContext('2d');
// ctxPlayGame.globalAlpha = 0.2;

// 游戏选择界面
var checkGameCvs = document.getElementById('checkGameCvs');
var ctxCheckGame = checkGameCvs.getContext('2d');

// 游戏暂停图层
var pauseGameCvs = document.getElementById('pauseGameCvs');
var ctxPauseGame = pauseGameCvs.getContext('2d');

// 游戏结束图层
var gameOverCvs = document.getElementById('gameOverCvs');
var ctxGameOver = gameOverCvs.getContext('2d');

// 游戏分数图层
var gameScoreCvs = document.getElementById('gameScoreCvs');
var ctxGameScore = gameScoreCvs.getContext('2d');

// 游戏加载图层
var gameloadingCvs = document.getElementById('gameloadingCvs');
var ctxGameloading = gameloadingCvs.getContext('2d');

// 游戏道具图层
var gamePropCvs = document.getElementById('gamePropCvs');
var ctxGameProp = gamePropCvs.getContext('2d');

// 游戏道具地雷图层
var mineCvs = document.getElementById('mineCvs');
var ctxMine = mineCvs.getContext('2d');

// 地雷特效辅助图层
var mineEffectCvs = document.getElementById("mineEffectCvs");
var ctxMineEffect = mineEffectCvs.getContext('2d');