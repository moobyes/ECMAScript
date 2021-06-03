/*
 * @Description: 根据一个数字生成数组
 * @Author: Moobye
 * @Date: 2021-02-20 23:33:23
 * @LastEditTime: 2021-02-20 23:36:53
 * @LastEditors: Moobye
 */
const n = 16
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
function toArr(n) {
  return [...new Array(n+1).keys()].slice(1)
}

function toArray(n) {
  return Array.from({length: n}, (item, index) => index + 1)
}

console.log('toArr(n) :>> ', toArr(n));
console.log('toArray(n) :>> ', toArray(n));