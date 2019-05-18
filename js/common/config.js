// 游戏配置
var config = {

    // 时间设置
    temps: null,
    tempsIndex: 0,
    tempsFn: function() {
        // console.log(config.tempsIndex);
        config.tempsIndex++;
        if (config.tempsIndex % 10 == 0 || config.tempsIndex == 5) {
            game.propGame.drawProp();
        }
    },

    // 公用的音频文件对象，谁要谁用
    audios: null,
    // 公用的图片文件对象，谁要谁用
    imgobj: null,

    // 绘制坚持了多长时间
    drawText: function(text) {
        game.overGame.drawGameOver();
        var tempArr = ['0', '0', '0', '0', '0', '0'];
        var newTextArr = text.split('').reverse();
        // console.log(newTextArr);
        for (var i = 0; i < newTextArr.length; i++) {
            tempArr[tempArr.length - i - 1] = newTextArr[i]
        };
        // console.log(tempArr);
        var textStr = tempArr.join('');
        // console.log(textStr);
        ctxGameOver.font = "60px 微软雅黑";
        ctxGameOver.fillStyle = '#000';
        ctxGameOver.fillText(textStr, 502, 435);
    },
    // 随机生产僵尸的变量
    createZombieTime: null,

    // 攻击间隔
    attachTime: 4,
    dobuleRole: true,

    // 游戏音乐
    hasMusic: true,

    // 游戏音效
    hasSound: true,

    // 子弹杀伤范围
    killRang: 20,
    checked: 0,
    gameBg: [
        ['bg_1', 'obstacle_1'],
        ['bg_2', 'obstacle_2'],
        ['bg_3', 'obstacle_3'],
        ['bg_4', 'obstacle_4'],
        ['bg_5', 'obstacle_5'],
        ['bg_6', 'obstacle_6'],
        ['bg_7', 'obstacle_7'],
        ['bg_8', 'obstacle_8'],
    ],
    bombArr: [
        // 关卡1        
        [{
                isBomb: false,
                x: 206,
                y: 139
            },
            {
                isBomb: false,
                x: 206,
                y: 370
            },
            {
                isBomb: false,
                x: 600,
                y: 175
            },
            {
                isBomb: false,
                x: 996,
                y: 139
            },
            {
                isBomb: false,
                x: 996,
                y: 370
            }
        ],
        // 关卡2        
        [{
                isBomb: false,
                x: 410,
                y: 64
            },
            {
                isBomb: false,
                x: 136,
                y: 281
            },
            {
                isBomb: false,
                x: 630,
                y: 350
            },
            {
                isBomb: false,
                x: 1014,
                y: 199
            },
        ],
        // 关卡3        
        [{
                isBomb: false,
                x: 80,
                y: 284
            },
            {
                isBomb: false,
                x: 359,
                y: 373
            },
            {
                isBomb: false,
                x: 428,
                y: 215
            },
            {
                isBomb: false,
                x: 1003,
                y: 228
            },
        ],
        // 关卡4
        [{
                isBomb: false,
                x: 470,
                y: 227
            },
            {
                isBomb: false,
                x: 718,
                y: 227
            },
            {
                isBomb: false,
                x: 159,
                y: 330
            },
            {
                isBomb: false,
                x: 1039,
                y: 330
            },
            {
                isBomb: false,
                x: 402,
                y: 573
            },
            {
                isBomb: false,
                x: 529,
                y: 573
            },
            {
                isBomb: false,
                x: 661,
                y: 573
            },
            {
                isBomb: false,
                x: 788,
                y: 573
            },
        ],
        // 关卡5
        [{
                isBomb: false,
                x: 282,
                y: 162
            },
            {
                isBomb: false,
                x: 88,
                y: 441
            },
            {
                isBomb: false,
                x: 313,
                y: 342
            },
            {
                isBomb: false,
                x: 587,
                y: 146
            },
            {
                isBomb: false,
                x: 660,
                y: 421
            },
            {
                isBomb: false,
                x: 1065,
                y: 241
            },
        ],
        // 关卡6
        [{
                isBomb: false,
                x: 323,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 2,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 3,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 4,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 5,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 6,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 7,
                y: 150
            },
            {
                isBomb: false,
                x: 323 + 100 * 8,
                y: 150
            }
        ],
        // 关卡7
        [{
                isBomb: false,
                x: 318,
                y: 150
            },
            {
                isBomb: false,
                x: 318 + 191,
                y: 150
            },
            {
                isBomb: false,
                x: 318 + 191 * 2,
                y: 150
            },
            {
                isBomb: false,
                x: 318 + 191 * 3,
                y: 150
            },
            // 
            {
                isBomb: false,
                x: 318,
                y: 472
            },
            {
                isBomb: false,
                x: 318 + 191,
                y: 472
            },
            {
                isBomb: false,
                x: 318 + 191 * 2,
                y: 472
            },
            {
                isBomb: false,
                x: 318 + 191 * 3,
                y: 472
            },
            // {
            //     isBomb: false,
            //     x: 318,
            //     y: 305
            // },
            // {
            //     isBomb: false,
            //     x: 318 + 191,
            //     y: 305
            // },
            // {
            //     isBomb: false,
            //     x: 318 + 191 * 2,
            //     y: 305
            // },
            // {
            //     isBomb: false,
            //     x: 318 + 191 * 3,
            //     y: 305
            // },
        ],
        // 关卡8
        [{
                isBomb: false,
                x: 489,
                y: 269
            },
            {

            }
        ]
    ], //存储汽油桶坐标
    // 障碍物参数
    obstacle: [
        // 关卡1
        [{
                x: 320 - 10,
                y: 139,
                w: 89 + 20,
                h: 94,
            },
            {
                x: 320 - 10,
                y: 370,
                w: 89 + 20,
                h: 94,
            },
            {
                x: 556 - 10,
                y: 31,
                w: 89 + 20,
                h: 84,
            },
            {
                x: 790 - 10,
                y: 139,
                w: 89 + 20,
                h: 94,
            },
            {
                x: 790 - 10,
                y: 370,
                w: 89 + 20,
                h: 94,
            },
            {
                x: 441 - 10,
                y: 256,
                w: 320 + 20,
                h: 94,
            },
            {
                x: 206 - 10,
                y: 506,
                w: 790 + 20,
                h: 94,
            },
        ],
        // 关卡2
        [{
                x: 111,
                y: 84,
                w: 102,
                h: 94
            },
            {
                x: 303,
                y: 117,
                w: 102,
                h: 94
            },
            {
                x: 512,
                y: 33,
                w: 102,
                h: 94
            },
            {
                x: 742,
                y: 78,
                w: 102,
                h: 94
            },
            {
                x: 931,
                y: 32,
                w: 102,
                h: 94
            },
            {
                x: 1018,
                y: 284,
                w: 102,
                h: 94
            },
            {
                x: 810,
                y: 234,
                w: 102,
                h: 94
            },
            {
                x: 915,
                y: 477,
                w: 102,
                h: 94
            },
            {
                x: 697,
                y: 364,
                w: 102,
                h: 94
            },
            {
                x: 511,
                y: 478,
                w: 102,
                h: 94
            },
            {
                x: 437,
                y: 286,
                w: 102,
                h: 94
            },
            {
                x: 226,
                y: 259,
                w: 102,
                h: 94
            },
            {
                x: 93,
                y: 392,
                w: 102,
                h: 94
            },
            {
                x: 257,
                y: 464,
                w: 102,
                h: 94
            },
        ],
        // 关卡3        
        [{
                x: 0,
                y: 456,
                w: 1200,
                h: 144,
            },
            {
                x: 0,
                y: 0,
                w: 1200,
                h: 170,
            },
            {
                x: 167,
                y: 141,
                w: 137,
                h: 144,
            },
            {
                x: 767,
                y: 228,
                w: 137,
                h: 171,
            },

        ],
        // 关卡4        
        [{
                x: 298,
                y: 85,
                w: 149,
                h: 86,
            },
            {
                x: 486,
                y: 85,
                w: 90,
                h: 86,
            },
            {
                x: 615,
                y: 85,
                w: 90,
                h: 86,
            },
            {
                x: 742,
                y: 85,
                w: 149,
                h: 86,
            },
            // {
            //     x: 298,
            //     y: 257,
            //     w: 74,
            //     h: 86,
            // },
            {
                x: 298,
                y: 478,
                w: 147,
                h: 86,
            },
            {
                x: 744,
                y: 478,
                w: 147,
                h: 86,
            },
            {
                x: 486,
                y: 478,
                w: 88,
                h: 86,
            },
            {
                x: 615,
                y: 478,
                w: 88,
                h: 86,
            },

        ],
        // 关卡5        
        [{
                x: 415,
                y: 130,
                w: 129,
                h: 40,
            },
            {
                x: 701,
                y: 194,
                w: 98,
                h: 46,
            },
            {
                x: 0,
                y: 491,
                w: 1200,
                h: 109,
            }
        ],
        // 关卡6       
        [{
                x: 210,
                y: 265,
                w: 184,
                h: 70,
            },
            {
                x: 428,
                y: 310,
                w: 176,
                h: 64,
            },
            {
                x: 853,
                y: 235,
                w: 40,
                h: 65,
            },
            {
                x: 893,
                y: 235,
                w: 100,
                h: 80,
            }
        ],
        // 关卡7       
        [{
                x: 176,
                y: 116,
                w: 92,
                h: 64,
            },
            {
                x: 176,
                y: 280,
                w: 92,
                h: 64,
            },
            {
                x: 176,
                y: 447,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191,
                y: 116,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191,
                y: 280,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191,
                y: 447,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 2,
                y: 116,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 2,
                y: 447,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 3,
                y: 116,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 3,
                y: 280,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 3,
                y: 447,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 4,
                y: 116,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 4,
                y: 280,
                w: 92,
                h: 64,
            },
            {
                x: 176 + 191 * 4,
                y: 447,
                w: 92,
                h: 64,
            },
            {
                x: 532,
                y: 275,
                w: 131,
                h: 60,
            },
        ],
        // 关卡8
        [{
                x: 122,
                y: 249,
                w: 197,
                h: 20,
            },
            {
                x: 91,
                y: 269,
                w: 248,
                h: 34,
            },
            {
                x: 106,
                y: 303,
                w: 223,
                h: 10,
            },
            {
                x: 124,
                y: 313,
                w: 180,
                h: 10,
            },
            // 
            {
                x: 451,
                y: 383,
                w: 211,
                h: 67,
            },
            {
                x: 662,
                y: 405,
                w: 34,
                h: 45,
            },
            // 
            {
                x: 710,
                y: 254,
                w: 194,
                h: 43,
            },
            {
                x: 710,
                y: 297,
                w: 176,
                h: 14,
            },
            {
                x: 0,
                y: 0,
                w: 1200,
                h: 112,
            }
        ]
    ],

};

// var checked = parseInt(prompt());