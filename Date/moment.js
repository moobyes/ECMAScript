/*
 * @Description: moment
 * @Author: Moobye
 * @Date: 2020-08-31 16:57:44
 * @LastEditTime: 2020-10-31 18:40:44
 * @LastEditors: Moobye
 */
// const dom = document.querySelector('body')
// const y = moment().subtract(1, 'days').format('YYYY-MM-DD')
// dom.innerText = y

const today = moment().format('YYYY-MM-DD'), bizDateStart = moment().startOf('month').format('YYYY-MM-DD');
console.log('tody ===  :>> ', today === bizDateStart);
yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
// 使用dayjs
const thisDay =  dayjs().format();
const firstDay = dayjs().startOf('month').format();

console.log('thisDay :>> ', moment().subtract(1, 'days').format('YYYY-MM-DD'));

console.log('thisMoment :>> ', moment(moment('2020-10').format('YYYY-MM-DD')).isBefore('2020-10-21'));