/*
 * @Description: generator
 * @Author: Moobye
 * @Date: 2020-10-13 09:11:41
 * @LastEditTime: 2020-10-13 09:13:02
 * @LastEditors: Moobye
 */
const gen = function*(n) {
  for(let i = 0; i < 4; i++) {
    n++
    yield n
  }
}

const genObj = gen(2)
console.log(genObj.next())
console.log(genObj.next())
console.log(genObj.next())
console.log(genObj.next())
console.log(genObj.next())
