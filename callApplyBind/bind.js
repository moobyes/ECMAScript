/*
 * @Description: bind
 * @Author: Moobye
 * @Date: 2020-09-14 23:00:46
 * @LastEditTime: 2020-09-15 11:24:27
 * @LastEditors: Moobye
 */
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError(
      'Error'
    )
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var fNOP = function() {}
  var fBound = function () { 
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
   }

   fNOP.prototype = this.prototype
   fBound.prototype = new fNOP()
   return fBound
}

