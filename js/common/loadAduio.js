    function loadAudio(arr, callback) {
        var audios = {};
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            var audio = new Audio();
            audio.src = "./sounds/"+arr[i] + ".ogg";
            audios[arr[i]] = audio;
            audio.oncanplay = function() {
                count++;
                if (count == arr.length) {
                    callback(audios);
                    // console.log('加载完毕');
                };
            }
        };
    };

