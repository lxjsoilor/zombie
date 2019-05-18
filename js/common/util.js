var util = {
    extend: function() {
        var arg = arguments;
        var target = arg[0];
        var tmpObj = null;
        for (var i = 1; i < arg.length; i++) {
            tmpObj = arg[i];
            for (var key in tmpObj) {
                if (tmpObj.hasOwnProperty(key)) {
                    target[key] = tmpObj[key];
                }
            }
        }
    },
    random: function(min, max) {
        min = min || 0;
        max = max || 0;
        return Math.random() * (max - min) + min;
    },
    clearCtx: function(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
    },
    // 删除数组中指定对象工具函数封装
    deleObjInArr: function(arr, obj) {
        var index = util.getIndex(arr, obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },
    getIndex: function(arr, obj) {
        var flag = true;
        // console.log(obj);
        for (var i = 0; i < arr.length; i++) {
            for (var key in arr[i]) {
                if (arr[i][key] != obj[key]) {
                    flag = false;
                };
            };
            if (flag) {
                return i;
            };
            flag = true;
        };
    },
    // 障碍物判断
    isObstacle: function(ctx, x, y) {
        if (ctx.isPointInPath(x, y)) {
            return true;
        } else {
            return false;
        }
    },

}