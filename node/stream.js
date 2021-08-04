/*
 * @Description: stream
 * @Author: Moobye
 * @Date: 2021-08-04 15:31:03
 * @LastEditTime: 2021-08-04 16:28:03
 * @LastEditors: Moobye
 */
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const fileName = path.resolve(__dirname, 'data.txt')
  res.writeHead(200, {contentType: 'text/plain'})
  res.write("<head> <meta charset='UTF-8'></head>");
  console.log('process :>> ', process);
  
  // readFile实现读取文件
  // fs.readFile(fileName, (err, data) => {
  //   res.end(data)
  // })
  // stream 实现
  const stream = fs.createReadStream(fileName)
  stream.pipe(res)
})

server.listen(8000)