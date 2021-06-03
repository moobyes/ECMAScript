/*
 * @Description: EventEmitter
 * @Author: Moobye
 * @Date: 2020-09-03 13:12:36
 * @LastEditTime: 2021-06-03 11:23:20
 * @LastEditors: Moobye
 */
class EventEmitter {
  constructor(){
    // 存储事件
    this.events = this.events || new Map() // Map 可以替换成Array或者Object，但Map更直接一点
  }
  // 监听时间
  on(type, fn) { // addListener换成 on
    if (!this.events.get(type)) {
      this.events.set(type, fn)
    }
  }
  // 触发事件
  emit(type) {
    let handle = this.events.get(type)
    handle.apply(this, [...arguments].slice(1))
  }
  // 解绑事件
  off(type) {
    if(!this.events.has(type)) return
    this.events.delete(type)
  }
  once(type, fn) {
    function onceFn(){
      fn()
      this.off(type, onceFn)
    }
    this.on(type, onceFn)
  }
}
// 测试
let emitter = new EventEmitter()
// 监听事件
// emitter.on('ages', age => {
//   console.log('age :>> ', age)
// })
// emitter.on('tt', tt => {
//   console.log('tt :>> ', tt)
// })
emitter.once('tt', tt => {
  console.log('tt :>> ', tt)
})
// 触发事件
// emitter.emit('ages', 18)
// emitter.off('ages')
emitter.emit('tt', '啥')
// console.log('emitter :>> ', emitter);