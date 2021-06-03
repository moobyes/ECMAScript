/*
 * @Description: 今日阅读：防重点击方法
 * @Author: Moobye
 * @Date: 2020-12-16 10:05:38
 * @LastEditTime: 2020-12-16 10:30:31
 * @LastEditors: Moobye
 */

// 和防抖以及节流的通常方法不一致的方式
// 在方法里加一个锁，通过锁的开闭合来防止重复点击
// 普通的写法，缺点是重用性不够，到处都是lock标记
const clickButton = (function () {
  let lock = false
  return function(postParams) {
    if (lock) return
    lock = true
    // 假设使用axios发送请求
    axios.post('urlxxx', postParams).then(
      // 表单提交成功
    ).catch(err => {
      // 表单提交出错
      console.log(err)
      lock = false
    })
  }
})()
button.addEventListener('click', clickButton)

// 封装一下，采用装饰器方式
// 在自动解锁的方式上增加一个手动解锁
function ignoreMultiClick(func, manual = false) {
  let lock = false
  return function(...args){
    if (lock) return
    lock = true
    let done = () => (lock = false)
    // 手动解锁
    if (manual) return func.call(this, ...args, done)
    let promise = func.call(this, ...args)
    Promise.resolve(promise).finally(done)
    return promise
  }
}

// 自动解锁
let clickButton = ignoreMultiClick(function (postParams) {
  if (!checkForm()) return
  return axios.post('urlxxx', postParams).then(
    // confirm form
  ).catch( err => {
    console.log(err)
  })
})
button.addEventListener('click', clickButton)

// 手动解锁
let clickButton = ignoreMultiClick(function (postParams, done) {
  if (!checkForm()) return done()
  return axios.post('urlxxx', postParams).then(
    // confirm form
  ).catch( err => {
    console.log(err)
  }).finally(() => done())
})
button.addEventListener('click', clickButton)

// 普通场景下还是自动解锁比较简单，因为可能有多个条件分支，手动解锁需要在每一个返回的地方都调用done。

// 可以复习一下装饰器模式