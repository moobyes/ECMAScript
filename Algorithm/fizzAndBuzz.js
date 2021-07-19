/*
 * @Description: fizz & buzz
 * @Author: Moobye
 * @Date: 2021-06-19 19:13:33
 * @LastEditTime: 2021-06-19 19:35:46
 * @LastEditors: Moobye
 */
// 根据数字生成该数字长度的连续的数组，最简单的方法是for循环
// Array.from 语法：
// Array.from(arrayLike[, mapFn[, thisArg]])
const num = 18
// Object.keys(Array.from({ length: num+1 })).slice(1) ES5方法
// const ary = Array.from(new Array(num + 1).keys()).slice(1)
// const ary = [...new Array(num+1).keys()].slice(1)
// const ary = Array.from({length:num},(item, index)=> index+1)

// 正题：
// 给一个整数n，按规则打印出从1到n的每个数，能被3整除的，输出fizz，能被5整除的，输出buzz，能被3和5都整除的，输出fizz buzz。

const ary = Array.from({length:num},(item, index)=> index+1).map(item => {
  if(item%3 === 0 && item%5 === 0) {
    return 'fizz buzz'
  } else if (item%3 === 0) {
    return 'fizz'
  } else if (item%5 === 0) {
    return 'buzz'
  } else {
    return item.toString()
  }
})
console.log('ary :>> ', ary);