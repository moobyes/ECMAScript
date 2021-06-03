/*
 * @Description: 冒泡排序
 * @Author: Moobye
 * @Date: 2021-01-28 15:49:57
 * @LastEditTime: 2021-01-28 16:17:45
 * @LastEditors: Moobye
 */

 let arr = [1, 23, 12, 5, 56, 7, 98, 29]

 function bubble(arr) {
   if (!Array.isArray(arr)) {
     throw new Error('请输入数组')
   }

   let list = [...arr]
   const len = list.length - 1

   for(let i = 0; i < len; i++) {
      console.log(`第${i}次`);
      let isRun = true

      for(let j = 1; j < len - i; j++) {
        if (list[j] > list[j+1]) {
          let temp = list[j]
          list[j] = list[j+1]
          list[j+1] = temp
        }
        
        isRun = false
      }

      if (isRun) {
        break
      }
   }

   return list
 }

 console.log(bubble(arr))