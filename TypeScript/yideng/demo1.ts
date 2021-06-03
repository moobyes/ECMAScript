/*
 * @Description: demo1
 * @Author: Moobye
 * @Date: 2021-01-20 14:18:13
 * @LastEditTime: 2021-01-20 14:20:49
 * @LastEditors: Moobye
 */

 class User {
   constructor(userName: string, age: number) {}
 }
 type TCtor = ConstructorParameters<typeof User>
 function init(...info: TCtor) {
   const [userName] = info
   console.log('[name]', userName)
 }

 init('TypeScript', 4)