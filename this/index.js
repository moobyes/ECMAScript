/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-07-23 13:11:00
 * @LastEditTime: 2020-07-23 15:53:54
 * @LastEditors: Moobye
 */ 
// import { testThis} from './tools'
const testThis = require('./tools')

// const testThis = function () {
//   console.log('this :>> ', this.name);
//  }

// console.log('testThis :>> ', testThis);
 
const thisObj = {
  name: 'test this',
  init() {
    console.log('this.name >>:', this.name)
    testThis.apply(null, this)
    // testThis.apply(this, this.name);
  }
}

thisObj.init()