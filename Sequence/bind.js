/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-08-19 22:41:49
 * @LastEditTime: 2020-08-19 22:46:58
 * @LastEditors: Moobye
 */
function myBind(context){ // 简单实现
  const _this = this // 变革this
  const args = Array.prototype.slice.call(arguments,1) // 拿到该函数的参数
  return function(){ // 返回一个函数
    const bindArgs = Array.prototype.slice.call(arguments) // 拿到该函数的参数
    _this.apply(context, args.concat(bindArgs)) // 改变this
  }

}