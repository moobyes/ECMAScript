/*
 * @Description: 连接mySql
 * @Author: Moobye
 * @Date: 2021-02-01 17:38:46
 * @LastEditTime: 2021-02-01 17:44:32
 * @LastEditors: Moobye
 */
const mysql = require('mysql')

// 创建一个connection
const connection = mysql.createConnection({
  host: '192.168.0.200',
  user: 'root',
  password: 'abcd',
  port: '3306'
})

// 创建一个connection
connection.connect((err) => {
  if(err) {
    console.log('err :>> ', +err)
    return
  }
  console.log('连接成功')
})

// 执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) {
    console.log('查询错误', err)
    return
  }
  console.log('The solution is: ', rows[0].solution)
})

// 关闭connection
connection.end(function(err) {
  if(err) return
  console.log('关闭连接成功！ :>> ');
})