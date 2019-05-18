function loadImg(arr, callback) {
    var imgs = {};
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = "./images/" + arr[i] + ".png";
        imgs[arr[i]] = img;
        img.onload = function() {
            count++;
            game.loadIngGame.drawLoad(count,arr.length);
            if (count == arr.length) {
                callback(imgs);
                ctxGameloading.globalAlpha = 0.3;
                var index = 0;
                var timer = setInterval(function() {
                    index++;
                    if (index > 20) {
                        clearInterval(timer);
                        gameloadingCvs.style.display = 'none';
                    };
                    ctxGameloading.fillStyle = '#000';
                    ctxGameloading.fillRect(0, 0, gameloadingCvs.width, gameloadingCvs.height);
                }, 30);
            }
        }
    };
}