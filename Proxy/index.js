/*
 * @Description: Proxy
 * @Author: Moobye
 * @Date: 2020-09-15 16:15:22
 * @LastEditTime: 2020-09-15 16:38:55
 * @LastEditors: Moobye
 */
let p = new Proxy(target, handler)

let onWatch = (obj, setBind, getLogger) {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    }
    set(target, property, value, receiver){
      setBind(value, property)
      return Reflect.set(target, property,value)
    }
    }
  }
  return new Proxy(obj, handler)
}

