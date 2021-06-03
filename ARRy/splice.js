/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-10-31 18:29:12
 * @LastEditTime: 2020-10-31 18:49:19
 * @LastEditors: Moobye
 */

var abc = [1, 3, 3]
var n = abc.splice(2, 1, 2,3, 4)
console.log('nx :>> ', abc);
// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.splice(2,0,"Lemon","Kiwi");
const period = '202010'
let datePeriod = period.split('')
    datePeriod.splice(4, 0, '-')
    const strPeriod = datePeriod.join('')
    console.log('strPeriod :>> ', strPeriod);

    const reasonObj = new Map({
      1: '产生自动入住订单',
      2: '未登录OTA平台使用插件',
      3: '产生自动入住订单、未登录OTA平台使用插件'
    })

    console.log('object :>> ', reasonObj.getItem(1));
    