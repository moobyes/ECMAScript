/*
 * @Description: Closure, 闭包
 * @Author: Moobye
 * @Date: 2021-04-06 10:27:52
 * @LastEditTime: 2021-04-07 14:08:17
 * @LastEditors: Moobye
 */

function fn1() {
  const n = 1;
  function fn2() {
    const N1 = n
    return N1;
  }
  return fn2();
}

// const abc = fn1()
// console.log(abc);

// 解JavaScript闭包的使用场景
// 1. 返回值
function fn() {
  const nama = 'hello'
  return function(){
    return name;
  }
}
const fnc = fn()
console.log(fnc())

// 2. 函数赋值
let fn2;
function fn(){
  const name = 'hello'
  fn2 = function (){
    return name;
  }
}