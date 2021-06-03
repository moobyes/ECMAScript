let gongchang = {}
gongchang.chanyifu = function(){

}

// let XMLHttpFactory = function (){}

// XMLHttpFactory.createXMLHttp = function(){
//   let XMLHttp = null
//   if (window.XMLHttpRequest) {
//     XMLHttp === new XMLHttpRequest()
//   } else if(window.ActiveXObject) {
//     XMLHttp === new ActiveXObject("Microsoft.XMLHTTP")
//   }
//   return XMLHttp
// }
// let AjaxHandler = function(){
//   let XMLHttp = XMLHttpFactory.createXMLHttp()
// }

let XMLHttpFactory = function (){}

XMLHttpFactory.prototype = {
  createFactory: function () { 
    throw new Error('This is a error')
   }
}

let XHRHandler = function(){
  XMLHttpFactory.call(this)
}

XHRHandler.prototype = new XMLHttpFactory()
XHRHandler.prototype.constructor = XHRHandler;

XHRHandler.prototype.createXMLHttp = function(){
  let XMLHttp = null
  if (window.XMLHttpRequest) {
    XMLHttp === new XMLHttpRequest()
  } else if(window.ActiveXObject) {
    XMLHttp === new ActiveXObject("Microsoft.XMLHTTP")
  }
  return XMLHttp
}
let AjaxHandler = function(){
  let XMLHttp = XMLHttpFactory.createXMLHttp()
}
