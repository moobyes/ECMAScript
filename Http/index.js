/*
 * @Description: http
 * @Author: Moobye
 * @Date: 2021-04-28 18:00:04
 * @LastEditTime: 2021-05-28 18:19:28
 * @LastEditors: Moobye
 */

var imgOnload;
var newestUrl = "";
window.onload = function() {
  imgOnload();
  getNewestUrl();
};
!(function(e, t) {
  function n() {
    t.body
      ? (t.body.style.fontSize = 12 * o + "px")
      : t.addEventListener("DOMContentLoaded", n);
  }
  function d() {
    var e = i.clientWidth / 10;
    i.style.fontSize = e / 0.75 + "px";
  }
  var i = t.documentElement,
    o = e.devicePixelRatio || 1;
  if (
    (n(),
    d(),
    e.addEventListener("resize", d),
    e.addEventListener("pageshow", function(e) {
      e.persisted && d();
    }),
    o >= 2)
  ) {
    var a = t.createElement("body"),
      s = t.createElement("div");
    (s.style.border = ".5px solid transparent"),
      a.appendChild(s),
      i.appendChild(a),
      1 === s.offsetHeight && i.classList.add("hairlines"),
      i.removeChild(a);
  }
})(window, document);
!(function(e, t) {
  function getImg() {
    //动态配置二维码图片地址
    var imgSrc =
      window.location.href.indexOf("m.oyohotels") >= 0
        ? "./imgs/1550739019.png"
        : "./imgs/1548731396.png";
    document.getElementById("qrcodeImg").src = imgSrc;
  }
  imgOnload = getImg;
})(window, document);
//根据系统类型获取最新URL
function getNewestUrl() {
  const env = getEnvByHost();
  const url = `https://gateway${env}.oyohotels.cn/mobile/api/oyo-cms/getNewestAppVersion`;
  var params = { firstChannel: "ANDROID" };
  if (jsBridge.isIos) {
    params = { firstChannel: "IOS" };
    newestUrl = "itms-services://?action=download-manifest&url=";
  }
  params.type = "flash";
  getVersion(url, params)
    .then(res => {
      if (res.data.data.updateUrl) {
        newestUrl = newestUrl + res.data.data.updateUrl;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function showAlert(){
  document.getElementsByClassName('alertBox')[0].style.display='none'
}
//axios封装
function getVersion(url, params) {
  return axios({
    url: url,
    params: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}
//请求网络判断
function getEnvByHost(host) {
  var env = "";
  const h = host || location.host;
  switch (h) {
    case "m-dev.oyohotels.cn":
      env = "-dev";
      break;
    case "m-test.oyohotels.cn":
      env = "-test";
      break;
    case "m-uat.oyohotels.cn":
      env = "-uat";
      break;
    case "m.oyohotels.cn":
      env = "";
      break;
    default:
      env = "-dev";
      break;
  }
  return env;
}
function download() {
  if (newestUrl && newestUrl.indexOf('http') ===-1) {
    document.getElementsByClassName('alertBox')[0].style.display='block';
    setTimeout("showAlert()", 1500 );
    return false;
  }
  window.location.href = newestUrl;
  if (jsBridge.isIos) {
    const noviceGuide = document.getElementsByClassName("noviceGuide")[0];
    noviceGuide.style.display = "block";
    const intro = document.getElementsByClassName("intro")[0];
    intro.style.display = "none";
    const sigature = document.getElementsByClassName("sigature")[0];
    sigature.style.position = "static";
  }
}
//页面加载完按钮可用
document.onreadystatechange = loadingChange;
function loadingChange() {
  if (document.readyState == "complete") {
    document.getElementById("download-button").disabled = false;
  }
}
