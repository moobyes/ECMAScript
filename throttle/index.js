/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-09-16 13:36:17
 * @LastEditTime: 2021-04-22 12:04:32
 * @LastEditors: Moobye
 */

//  节流
const throttle = (func, wait = 50) => {
  let lastTime = 0
  return function(...args) {
    let now = +new Date()
    if (now - lastTime > wait){
      lastTime = now
      func.apply(this, args)
    }
  }
}
// 防抖
const debounce = (func, wait = 50) => {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, await)
  }
}
