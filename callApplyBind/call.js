/*
 * @Description: Moobye
 * @Author: Moobye
 * @Date: 2020-09-14 22:08:58
 * @LastEditTime: 2020-10-21 18:37:15
 * @LastEditors: Moobye
 */
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
// es5版本
Function.prototype.myCall1 = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('type error')
  }
  var context = context || window
  context.fn = this
  var args = []
  for(var i = 1; i<arguments.length; i++){
    args.push('arguments[' + i + ']')
  }
  const result = eval('context.fn('+'args'+')')
  delete context.fn
  return result
}