/*
 * @Description: Apply
 * @Author: Moobye
 * @Date: 2020-09-14 22:32:25
 * @LastEditTime: 2020-10-21 18:39:13
 * @LastEditors: Moobye
 */
Function.prototype.muApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  let context = context || window
  context.fn = this
  let result
  if(arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}

// es5版本
Function.prototype.muApply1 = function (context, arr) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  var context = context || window
  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for(var i = 1, len = arguments.length; i < len; i++){
      args.push('arguments['+ i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}