/*
 * @Description: 数组随机排序
 * @Author: Moobye
 * @Date: 2021-01-22 10:53:01
 * @LastEditTime: 2021-01-22 14:34:40
 * @LastEditors: Moobye
 */

 const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

 function foo(arr) {
   let cloneArr = arr.concat()
   cloneArr.sort(() => {
     return Math.random - 0.5
   })
   return cloneArr
 }
 console.log(foo(arr))
//  function newFoo(arr) {
//    let result = []
//    let cloneArr = arr.concat()
//    (
//      function (){
//        if(!cloneArr.length) {return}
       
//      }
//    )()
//  }

//  function shuffle(arr) {
//    let length = arr.length
//    let shuffled = Array(length) // 生成一个新的length为6的空数组
   
//    for(let index = 0, rand; index < length; index++) {
//      rand = ~~(Math.random()*(index + 1))
//      if (rand !== index) {
//        shuffled[index] = shuffled[rand]
//        shuffled[rand] = shuffled[index]
//      }
//    }

//    return shuffled
//  }
const shuffled = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * (i + 1))
      console.log('index :>> ',i, index)
      let itemAtIndex = arr[index]
      arr[index] = arr[i]
      arr[i] = itemAtIndex
  }
  return arr
}
Array.prototype.shuffle = function () {
  var arr = this
  for (var i = arr.length - 1; i >= 0; i--) {
      var randomIdx = Math.floor(Math.random() * (i + 1))
      var itemAtIdx = arr[randomIdx]
      arr[randomIdx] = arr[i]
      arr[i] = itemAtIdx
  }
  return arr
}
// var tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(arr.shuffle())//[ 5, 9, 6, 8, 4, 7, 3, 1, 2 ]
 console.log(shuffled(arr))