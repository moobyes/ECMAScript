/*
 * @Description: Koa
 * @Author: Moobye
 * @Date: 2021-02-01 16:01:42
 * @LastEditTime: 2021-02-01 16:28:31
 * @LastEditors: Moobye
 */
const Koa = require('koa')
const app = new Koa()

async function responseTime (ctx, next) {
  console.log('Started tracking response time')
  const started = Date.now()
  await next()
  // once all middleware below completes, this continues
  const ellapsed = (Date.now() - started) + 'ms'
  console.log('Response time is:', ellapsed)
  ctx.set('X-ResponseTime', ellapsed)
}
app.use(responseTime)

// 中间件1
app.use(async (ctx, next) => {
  ctx.status = 200
  console.log('准备状态')
  await next()
})

// 中间件2
app.use(async (ctx) => {
  console.log('准备内容')
  ctx.body = '我是页面'
})

app.listen(3000, () => console.log('启动'))