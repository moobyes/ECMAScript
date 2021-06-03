/*
 * @Description: module of requireJs
 * @Author: Moobye
 * @Date: 2021-05-17 11:39:07
 * @LastEditTime: 2021-05-17 11:41:57
 * @LastEditors: Moobye
 */
define(function() {
  'use strict';
  let url = window.location.href
  function getUrl() {
    return url.toUpperCase();
  }
  // 暴露模块
  return {
    getUrl,
  };
});