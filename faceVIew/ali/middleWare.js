/*
 * @Description: 自己的中间件1
 * @Author: Moobye
 * @Date: 2021-02-01 17:05:08
 * @LastEditTime: 2021-02-01 17:20:17
 * @LastEditors: Moobye
 */
// 通用中间件写法
module.exports = function(ip_blacklist) {
  // 配置处理
  
  return async (ctx, next) => {
    // 中间件逻辑处理
    if(!Array.isArray(configs) && configs.length) {
      let ip = ctx.request.headers['x-real-ip'] || '' //获取客户端ip，由于使用nginx作为负载均衡，所以获取ip的方式可通过x-real-ip字段
      if(ip && ip_blacklist.indexOf(ip) !== -1) {
        await next()
      } else {
        return res.end('ip restricted')
      }
    } else {
      await next()
    }
  }
}

module.exports = (options) => async (ctx, next) => {
  try{
    // 获取 token
    const token = ctx.header.authorization
    if (token) {
      try {
        // verify 函数验证 token，并获取用户相关信息
        await verify(token) // 验证函数
      } catch (err) {
        console.log(err)
      }
    }
    // 进入下一个中间件
    await next()

  } catch(e) {
    console.log(e)
  }
}