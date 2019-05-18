var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('html', function() {
    gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('js', function() {
    gulp.src(['./js/**/*.js', './js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});


var jsArr = [
    "js/common/config.js",
    "js/common/util.js",
    "js/common/getCtx.js",
    "js/common/keyCtroller.js",
    "js/common/loadImg.js",
    "js/common/loadAduio.js",
    "js/common/createRole.js",
    "js/component/bg.js",
    "js/component/gameScore.js",
    "js/scene/loadGame.js",
    "js/scene/playGame.js",
    "js/scene/checkGame.js",
    "js/scene/pauseGame.js",
    "js/scene/gameOver.js",
    "js/role/obstacle.js",
    "js/role/role.js",
    "js/role/bullet.js",
    "js/role/zombie.js",
    "js/role/gas.js",
    "js/role/mine.js",
    "js/role/prop.js",
    "js/sailorGame.js",
    "js/main.js"
];

gulp.task('jsAll', function() {
    gulp.src(jsArr)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});



gulp.task('html2', function() {
    gulp.src('index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        }))
        .pipe(gulp.dest('dist'));
});
