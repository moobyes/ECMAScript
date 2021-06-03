/*
 * @Description: 字节面试题
 * @Author: Moobye
 * @Date: 2021-02-23 21:28:18
 * @LastEditTime: 2021-03-01 16:31:25
 * @LastEditors: Moobye
 */
//  防抖， 触发高频时间n秒后函数只会执行一次，如果n秒内高频时间再次触发，则重新计算时间
function Debounce(fn, time = 500) {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, time)
  }
}

function sayHi() {
  console.log('防抖成功！')
}
const inp = document.getElementById('inp')
inp.addEventListener('input', debounce(sayHi, 500))

// 节流，高频时间触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
function throttle(fn, squ = 500) {
  let canRun = true // 设置了一个标识
  return function () {
    if (!canRun) return // 标识为false的时候，就返回
    canRun = false
    setTimeout(() => { // 开始跑setTimeout
      fn.apply(this, arguments) // 执行事件
      canRun = true // 将标识设置为true
    }, squ)
  }
}
const throttleFn = (fn, wait = 500) => {
  let lastTime = 0
  return function (...args) {
    let now = +Date.now()
    if (now - lastTime > wait) {
      fn.apply(this.args)
      lastTime = now
    }
  }
}

// 冒泡排序
let arr = [1, 23, 12, 5, 56, 7, 98, 29]

function bubble(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('请输入数组')
  }

  let list = [...arr]
  const len = list.length

  for (let i = 0; i < len; i++) {

    let isRun = true

    for (let j = 1; j < len - i; j++) {
      if (list[j] > list[j + 1]) {
        let temp = list[j]
        list[j] = list[j + 1]
        list[j + 1] = temp
      }
      console.log('len :>> ', list)
      isRun = false
    }

    if (isRun) {
      break
    }
  }

  return list
}


// Set,WeakSet,Map,WeakMap 四个类型的区别以及对应的方法
// Set 允许

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('await async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
//输出 //script start //async1 start //async2 //promise1 //script end //async1 end //promise2

for (var i = 0; i < 5; i++) {
  // var n = i
 
   console.log(i)
}