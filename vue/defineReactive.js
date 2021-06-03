/*
 * @Description: vue的数据双向绑定实现
 * @Author: Moobye
 * @Date: 2021-06-02 12:15:44
 * @LastEditTime: 2021-06-02 12:22:58
 * @LastEditors: Moobye
 */

// observe方法遍历并包装对象
function observe(target) {
  // 如果是对象，就遍历它
  if(target && typeof target === 'object') {
    // 将target塞给defineReactive来遍历，并给目标属性加上监视器
    defineReactive(target, key, target[key])
  }
}

// defineReactive方法的实现
function defineReactive(target, key, val) {
  const dep = new Dep()

  // 属性val如果是object，再次遍历（递归）
  observe(val)

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function(){
      return val
    },
    set: function(value){
      dep.notify()
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify(){
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
