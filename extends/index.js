/*
 * @Description: 继承
 * @Author: Moobye
 * @Date: 2020-09-15 15:38:54
 * @LastEditTime: 2020-09-15 15:50:34
 * @LastEditors: Moobye
 */

//  组合继承
function Parent(value){
  this.val = value
}
Parent.prototype.getValue = function(){
  console.log('this.val :>> ', this.val);
}

function Children(value) {
  Parent.call(this, value)
}

Children.prototype = new Parent(1)

// 寄生组合继承
Children.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Children,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
