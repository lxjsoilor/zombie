// 创建游戏对象
var game = new SailorGame();
game.run();





// // 游戏暂停
// document.onclick = function() {
//     game.pause();
//     // game.isGameOver = true;
// }


// require.config({
// 	baseUrl:'./js/',
// 	paths:{
// 		sailorGame:'./sailorGame',
// 		gas:'./role/gas',
// 		zombie:'./role/zombie',
// 		bullet:'./role/bullet',
// 		role:'./role/role',
// 		obstacle:'./role/obstacle',

// 		gameOver:'./scene/gameOver',
// 		pauseGame:'./scene/pauseGame',
// 		checkGame:'./scene/checkGame',
// 		playGame:'./scene/playGame',
// 		loadGame:'./scene/loadGame',

// 		gameScore:'./component/gameScore',
// 		bg:'./component/bg',


// 		createRole:'./common/createRole',
// 		loadAduio:'./common/loadAduio',
// 		loadImg:'./common/loadImg',
// 		keyCtroller:'./common/keyCtroller',
// 		getCtx:'./common/getCtx',
// 		util:'./common/util',
// 		config:'./common/config',

// 	}
// })

// define(['sailorGame','gas','zombie','bullet','role','obstacle','gameOver','pauseGame',
// 	'checkGame','playGame','loadGame','gameScore','bg','createRole','loadAduio','loadImg',
// 	'keyCtroller','getCtx','util','config'],function () {

// 		var game = new SailorGame();
// 		game.run();



// 		// 游戏暂停
// 		document.onclick = function() {
// 		    game.pause();
// 		}

// 	})