/*
 * @Description: 方法封装
 * @Author: Moobye
 * @Date: 2020-08-09 13:35:12
 * @LastEditTime: 2020-08-09 13:51:59
 * @LastEditors: Moobye
 */
// js插件封装，需要添加兼容各种模块的兼容
// 目前js的模块有好几个标准，一个是Es6 export，ADM，Commonjs，CMD以及node（和CommonJs一致）

基于自运行函数：

(function(){})()
;!function(){};
// eg：
(function(global, factory){})(this, function(){})

;(function (root, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this,function () {　　
  // ...  这里编写你的代码　　
  return {};
})

// Jquery
(function( global, factory ) {
  "use strict";
  if ( typeof module === "object" && typeof module.exports === "object" ) {
      module.exports = global.document ? factory(global, true) : function( w ) {
        if ( !w.document ) {
          throw new Error( "jQuery requires a window with a document" );
        }
        return factory( w );
      };
  } else {
      factory( global );
  }
// Pass this if window is not defined yet
})( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
  //... 这里编写你的代码,例如：
  if ( !noGlobal ) {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
})

// utils-tool
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['@jsmini/util-tools'] = {})));
}(this, (function(){
  "use strict";
  // 业务代码
})))