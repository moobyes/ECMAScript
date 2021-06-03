/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2021-05-17 11:40:50
 * @LastEditTime: 2021-05-17 11:40:58
 * @LastEditors: Moobye
 */
(function() {
  require(["rModule.js"], function(module) {
    let currentUrl = module.getUrl();
    alert("当前页面的URl：" + currentUrl);
  });
})();