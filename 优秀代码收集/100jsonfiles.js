/*
 * @Description: 100个json文件如何获取：nodejs
 * @Author: Moobye
 * @Date: 2021-08-04 10:52:42
 * @LastEditTime: 2021-08-04 11:29:47
 * @LastEditors: Moobye
 */
// 假如有100个json文件需要获取，并组合成一个文件
// 解法1：一次require进来，获取每个文件的json值，然后用Object.assign()组合

const json1 = require('../1.json')
const json2 = require('../2.json')
const json3 = require('../3.json')
// ...
const json1 = require('../100.json')
const result1 = {}
Object.assign(result1, json1, json2, /* ... */, json100)

// 解法2：分批处理这一百个文件
const jsonFiles2= ['../json1', '../json2'/* ... */, '../json100']
const batchFileCount = 20;
const result2 = {}
for (let i = 0; i<5;i++){
  const files - jsonFiles2.slice(i*20, (i+1)_20)
  for(const file of files) {
    // Object.assign(result, require(file)); // require有缓存，需重新定义
    Object.assign(result, requireJSON(file));
  }
}
function requireJSON(jsonFile) { // 可重复使用
  const content = fs.readFileSync(jsonFile)
  return JSON.parse(content)
}

// 解法3: 类的封装
const { Writable } = require('stream')

class JSONStream extends Writable{
  constructor(options = {}) {
    options.highWatermark = 20;
    options.objectMode = true
    super(options)
    this._result = {}
  }

  get result() {
    return this._result
  }

  _write(jsonFile, _, cb) {
    Object.assign(this._result, requireJSON(jsonFile))
    cb()
  }
}

const { Readable } = require('steam')
const jsonFiles = ['../json1', '../json2'/* ... */, '../json100']
const readable = new Readable({ objectMode: true})
const writable = new JSONStream()

for (const jsonFile of jsonFiles) {
  readable.push(jsonFile)
}
readable.push(null)

readable.pipe(writable).on('finish', () => console.log(writable.result)).on('error', err => console.error(err.stack))