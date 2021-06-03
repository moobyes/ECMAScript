/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-07-24 10:17:16
 * @LastEditTime: 2021-02-23 21:54:37
 * @LastEditors: Moobye
 */ 
/**
 * 函数防抖， 一定时间内触发时间只执行一次
 * @param {*} func 需要防抖的函数
 * @param {*} delay 防抖延迟
 * @param {*} immediate 是否立即执行，为true表示连续触发时立即执行，即执行第一次，为false表示连续触发后delay ms后执行一次
 */
let debounce = function(func, delay=100, immediate = false) {
  let timeoutId, last, context, args, result

  function later() {
    const interval = Date.now() - last
    if (interval < delay && interval >= 0) {
      timeoutId = setTimeout(later, delay - interval)
    } else {
      timeoutId = null
      if(!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    last = Date.now()

    if(immediate && !timeoutId) {
      timeoutId = setTimeout(later, delay)
    }

    return result
  }
}

let flag = false // 标志位，表示当前是否正在请求数据
let xhr = null

let request = (i) => {
  if (flag) {
    clearTimeout(xhr)
    console.log(`取消第${i-1}次请求`)
  }
  flag = true
  console.log(`开始第${i}次请求`)
  xhr = setTimeout(() => {
    console.log(`请求${i}响应成功`)
    flag = false
  }, Math.random() * 200)
}

let fetchData = debounce(request, 50)

// 模拟连续触发的请求
let count = 1
let getData = () => {
  setTimeout(() => {
    fetchData(count)
    count++
    if (count < 11) {
      getData()
    }
  }, Math.random() * 200)
}

getData()