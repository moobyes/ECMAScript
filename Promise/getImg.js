/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-08-28 10:15:40
 * @LastEditTime: 2020-08-28 10:18:54
 * @LastEditors: Moobye
 */
const url = ''

function loadimg (src) {
  const p = new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载错误${src}`)
      reject(err)
    }
    img.src = src
  })
}