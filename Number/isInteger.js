/*
 * @Description: isInteger
 * @Author: Moobye
 * @Date: 2021-06-21 17:30:57
 * @LastEditTime: 2021-06-21 17:37:10
 * @LastEditors: Moobye
 */
// isFinite 方法检测它参数的数值，如果参数是NaN，Infinity或者-Infinity,会返回false，其他返回true，
// Number.isInteger(Infinity) === false, 而typeof Infinity和Math.floor(Infinity)得到的均为true
// 取整：Math.floor、Math.ceil、Math.rou均可
Number.isInteger = function (value) {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  )
}
// 异或运算
function isInteger(x) {
  return typeof value === "number" && isFinite(value) && x ^ (0 === x);
}
// 取余
function isInteger(x) {
  return typeof value === 'number' && isFinite(value) && x%1 === 0;
}