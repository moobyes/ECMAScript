/*
 * @Description: indexBD
 * @Author: Moobye
 * @Date: 2020-10-20 13:46:52
 * @LastEditTime: 2020-10-20 14:00:56
 * @LastEditors: Moobye
 */
const request = window.indexedDB.open('test',1)

request.onupgradeneeded = function(event) {
  const db = event.target.result
  const objectStore = db.createObjectStore('table1', {keyPath: 'id', autoIncrement: true})
  const transaction = db.transaction(['customers'], 'readwrite')

  objectStore.createIndex('name', 'name', {unique: false})
}

request.onsuccess = function(event) {
  const db = event.target.result
  const transaction = db.transaction(['table1'], 'readwrite')
  const objectStore = transaction.objectStore('table1')
  const index = objectStore.index('name')

  objectStore.add({name: 'a', age: 10}) // 添加数据
  objectStore.add({name: 'b', age: 20}) // 添加数据

}

request.onerror = function(event) {
  alert(`Why didn't you allow my web app to use IndexBD?`)
}