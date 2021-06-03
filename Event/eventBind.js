// 还需要添加偏函数，考虑浏览器兼容以及兼容性的多次判断

function bindEvent(elem, type, selector, fn){
  if (fn == null){
    fn = selector
    selector = null
  }

  elem.addEventListener(type, e => {
    const target = e.target
    if (selector) {
      // 需要代理
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      // 不需要代理
      fn.call(target, e)
    }
  })
}