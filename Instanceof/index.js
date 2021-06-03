/*
 * @Description: instanceof
 * @Author: Moobye
 * @Date: 2020-09-15 16:42:15
 * @LastEditTime: 2020-09-15 16:44:38
 * @LastEditors: Moobye
 */
function myInstanceof (left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while(true) {
    if(left === null || left === undefined){
      return false
    }
    if(prototype === left){
      return true
    }
    left = left.__proto__
  }
}