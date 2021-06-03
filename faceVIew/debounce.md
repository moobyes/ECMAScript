<!--
 * @Description: debounce面试题
 * @Author: Moobye
 * @Date: 2020-07-24 07:34:20
 * @LastEditTime: 2020-07-24 10:16:47
 * @LastEditors: Moobye
--> 
# debounce 面试题

## 题目
> 多个tab对应一个内容框，点击每个tab都会请求接口并渲染内容框，如何保证频繁点击tab但能够确保数据正确显示？ 

## 题解

一. 分析

因为每个请求的处理时长不一致，可能会导致先发送的请求后响应，即请求响应顺序和请求发送顺序不一致，从而导致数据显示不正确。

可以理解为连续处罚多个请求，如何保证请求响应顺序和请求发送顺序一致。对于问题所在场景，用户只关心最后数据是否显示正确，即可以简化为：连续触发多个请求，如何保证最后响应的结果是最后发送的请求（不关注之前的请求是否发送或者响应成功）

类似的场景：input输入框即时搜索，表格快速切换页码

二、解决方案

防抖（过滤一些非必要的请求）+ 取消上次未完成的请求（保证最后一次请求的响应顺序）

取消请求方法：

* XMLHttpRequest 使用 abort api 取消请求
* axios 使用 cancel token取消请求

伪代码（以setTimeout模拟请求，clearTimeout取消请求）

```js
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
      timeout = setTimeout(later, delay - interval)
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
    console.log(`请求${}响应成功`)
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
 
```





