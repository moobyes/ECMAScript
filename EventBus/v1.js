/*
 * @Description: eventbus
 * @Author: Moobye
 * @Date: 2021-02-18 10:27:42
 * @LastEditTime: 2021-02-18 10:28:47
 * @LastEditors: Moobye
 */

(function () {
  //创建EventBus对象
  EventBus = function () {
    console.log("maps init...");
  };
  //准备数组容器
  let objBus = [],
    arrBus = [];
  //添加方法
  EventBus.prototype = {
    obj: {
      set: function (key, action) {
        if (key && action) {
          var map = {};
          map.k = key;
          map.v = action;
          //如果存在，则删除之前添加的事件
          for (var i = 0, busLength = objBus.length; i < busLength; i++) {
            var tempMap = objBus[i];
            if (tempMap.k == key) {
              objBus.splice(i, 1);
            }
          }
          objBus.push(map);
        }
      },
      get: function (key) {
        if (key) {
          for (var i = 0, busLength = objBus.length; i < busLength; i++) {
            var map = objBus[i];
            if (map.k == key) {
              return map.v();
            }
          }
        }
      },
    },
    arr: {
      push: function (key, action) {
        if (key && action) {
          var map = {};
          map.k = key;
          map.v = action;
          arrBus.push(map);
        }
      },
      pop: function (key) {
        if (key) {
          for (var i = 0, busLength = arrBus.length; i < busLength; i++) {
            var map = arrBus[i];
            if (map.k == key) {
              map.v();
            }
          }
        }
      },
    },
  };
})();
