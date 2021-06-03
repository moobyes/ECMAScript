/*
 * @Description: 手写Promise
 * @Author: Moobye
 * @Date: 2020-09-03 11:49:39
 * @LastEditTime: 2020-10-21 12:53:57
 * @LastEditors: Moobye
 */
const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}
class Deferred{
  constructor(callback) {
    this.value = undefined
    this.status = STATUS.PENDING

    // 建立两个状态对应的事件队列
    this.rejectQueue = [] // catch错误的队列
    this.resolveQueue = [] // then返回的队列

    let called // 用于判断状态是否被修改，flag
    const resolve = value => {
      if (called) return // 状态已经被修改了，返回
      called = true // 修改状态
      
      setTimeout(() => {
        this.value = value
        // 修改状态
        this.status = STATUS.FULFILLED
        // 调用回调
        for(const fn of this.resolveQueue) {
          fn(this.value)
        }
      })
      
      
    }
    const reject = reason => {
      if(called) return
      called = true
      
      setTimeout(() => {
        this.value = reason
        
        // 修改状态
        this.status = STATUS.REJECTED
        // 调用回调
        for(const fn of this.rejectQueue) {
          fn(this.value)
        }
      })

    }
    try {
      callback(resolve, reject)
    } catch(error){
      // 出现异常直接进行reject
      reject(error)
    }
  }
  
  then(onResolve, onReject){
    // 解决值穿透
    onReject = isFunction(onReject) ? onReject : reason => { throw reason }
    onResolve = isFunction(onResolve) ? onResolve : value => { return value }
    if (this.status === STATUS.PENDING) {
      // 将回调放入队列中
      const rejectQueue = this.rejectQueue
      const resolveQueue = this.resolveQueue

      const promise =  new Deferred((resolve, reject) => {
        // 暂存到成功回调等待调用
        resolveQueue.push(function(innerValue) {
          try {
            const value = onResolve(innerValue)
            // resolve(value)
            whatIsThenParams(promise, value, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
        // 暂存到失败回调等待调用
        rejectQueue.push(function(innerValue) {
          try{
            const value = onReject(innerValue)
            // resolve(value)
            hatIsThenParams(promise, value, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      })
    } else {
      const innerValue = this.value
      const isFulfilled = this.status ==== STATUS.FULFILLED
      const promise =  new Deferred((resolve, reject) => {
        try {
          const value = isFulfilled
          ? onResolve(innerValue) // 成功状态调用 onResolve
          : onReject(innerValue) // 失败状态调用 onReject
          hatIsThenParams(promise, value, resolve, reject)
        } catch(err) {
          reject(err)
        }
      })
    }
  }
  catch(onReject) {
    return this.then(null, onReject)
  }
  static resolve(value) {
    return new Deferred((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Deferred((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    if(!Array.isArray(promises)) {
      return Deferred.reject(new TypeError('args must be an array'))
    }

    // todo
    
  }
  static race(promises) {
    if(!Array.isArray(promises)) {
      return Deferred.reject(new TypeError('args must be an array'))
    }

    // todo
    
  }
}

function whatIsThenParams(promise, value, resolve, reject) {
  if(promise === value) {
    reject(
      new TypeError('Chaining cycle detected for promise')
    )
  }
  if (value instanceof promise) {
    value.then(function (val) {
      whatIsThenParams(promise, value, resolve, reject)
    },
    function(reason) {
      reject(reason)
    })
    return
  }

  resolve(value)
}

function isFunction(fn) {
  if (typeof fn !== 'function') {
    return false
  }
  return true
}