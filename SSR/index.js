/*
 * @Description: index.js
 * @Author: Moobye
 * @Date: 2021-02-07 13:52:30
 * @LastEditTime: 2021-02-07 14:54:54
 * @LastEditors: Moobye
 */
const express = require('express')
const http = require('http')
const app = express()
const Vue = require('vue')
const renderFn = require('vue-server-renderer').createRenderer()

function render(req, res) {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>req.url:{{ url }}</div>`
  })

  renderFn.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    } else {
      console.log('html :>> ', html);
      res.send(`${html}`)
    }
  })
}


app.get('*', function (req, res){
  // res.send('Hello， world！')
  // console.log('req, res :>> ', req, res);
  render(req,res)
})
const port = process.env.PORT || 3006
app.listen(port, () => {
 console.log(`server started at localhost:${port}`)
})
