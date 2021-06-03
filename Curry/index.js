/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2021-04-22 12:04:55
 * @LastEditTime: 2021-04-22 12:26:17
 * @LastEditors: Moobye
 */

function sum (a, b, c) {
  return a + b + c
}
const myCurry = (fn) => {
  return function curriedFn(...args) {
    if(args.length < fn.length) {
      return function () {
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    return fn(...args)
  }
}

const myCurry2 = function (fn) {
  const arg = Array.prototype.slice.call(arguments,1); 
  // console.log('arg :>> ', arg);
  return function curryFn(...args) {
    if (args.length < fn.length){
      return function () {
        return curryFn(...args.concat(arg))
      }
    }
    return fn(...args)
  }
}

const curry = myCurry2(sum)
// console.log(curry(1,2,3))
console.log(curry(1,3))