/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-09-15 15:55:23
 * @LastEditTime: 2020-09-15 16:40:48
 * @LastEditors: Moobye
 */
function createObject(o){
  function F() {}
  F.prototype = o
  return new F()
}

function objectFactory(){
  var obj = new Object(),
  Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}