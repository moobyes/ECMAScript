/*
 * @Description: server.js
 * @Author: Moobye
 * @Date: 2021-04-14 10:57:57
 * @LastEditTime: 2021-08-04 15:30:53
 * @LastEditors: Moobye
 */
const http = require('http')
const port = 8888

http.createServer(function(req, res) {
  console.log('req.url :>> ', req.url);

  res.end('123')
}).listen(port)


// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     // response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// 终端打印如下信息
console.log(`Server running at http://127.0.0.1:${port}/`);