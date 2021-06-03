/*
 * @Description: Module
 * @Author: Moobye
 * @Date: 2021-05-17 11:10:18
 * @LastEditTime: 2021-05-17 11:13:56
 * @LastEditors: Moobye
 */
(function(window) {
  let data = 'data'

  function get(){
    console.log('data :>> ', data);
  }

  function set(val) {
    data = val
  }
  
  window.myModule = {
    get,
    set
  }
})(window)