/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2021-02-20 23:00:30
 * @LastEditTime: 2021-02-20 23:06:21
 * @LastEditors: Moobye
 */
const s = 'AABBCCDDAAAAAA'

function countNum (str, a) {
  let count = 0
  const len = s.length
  const arr = s.split('')
  for (let i = 0; i < len; i++) {
    /* code */
    console.log('arr[i] === a :>> ', arr[i] === a);
    if(arr[i] === a) count++;
  }
  // console.log('object :>> ', count);
  return count;
}
console.log(countNum(s, 'A'))