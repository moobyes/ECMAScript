/*
 * @Description: 快排
 * @Author: Moobye
 * @Date: 2020-08-18 21:49:52
 * @LastEditTime: 2020-08-18 22:27:01
 * @LastEditors: Moobye
 */
const arry = [9,19,2,23,43,67,43]

function quick(arry) {

  if (arry.length <= 0){
    return arry
  }

  // 找出中间值
  const midIndex = Math.floor(arry.length/2)
  const midValue = arry.splice(midIndex, 1)[0]

  console.log('object', midIndex, midValue)

  let leftArry = [], rightArry = []
  for(let i=0; i < arry.length; i++) {
    const item = arry[i]
    item <= midValue ? leftArry.push(item) : rightArry.push(item)
  }
  return quick(leftArry).concat(midValue, rightArry)
}

// console.log('quick(arry)', quick(arry))


function qSort3(arr) { //三路快排
  if (arr.length == 0) {
    return [];
  }
  var left = [];
  var center = [];
  var right = [];
  var pivot = arr[0]; //偷懒，直接取第一个,实际取值情况 参考[快速排序算法的优化思路总结]
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] == pivot) {
      center.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...qSort3(left), ...center, ...qSort3(right)];
}

console.log('quick(arry)', qSort3(arry))