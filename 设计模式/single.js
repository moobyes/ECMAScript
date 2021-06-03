const xw = (function() {
  let men
  let xwj = function(msg) {
    this.menLing = msg
  }
  let info = {
    sendMsg(msg) {
      if (!men) {
        men = new xwj(msg)
      }
      return men
    }
  }
  return info
})()
const xm = {
  callXw(msg) {
    console.log('xw :>> ', xw);
    let _xw = xw.sendMsg(msg)
    _xw = null
    console.log('_xw.menLing :>> ', _xw.menLing)
  }
}

xm.callXw('dd')