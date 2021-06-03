/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-08-21 09:37:54
 * @LastEditTime: 2020-08-21 09:49:35
 * @LastEditors: Moobye
 */
// 嵌套层级优化
function supply(fruit, quality) {
  const  redFruits = ['apple', 'strawberry', 'cherry']
  // 条件1，水果存在
  if (fruit){
    // 条件2：属于红色水果
    if（redFruits.includes(fruit)) {
      console.log('红色水果')

      // 条件3：水果数量大于10
      if(quality > 10) {
        console.log('数量大于10个')
      }
  } else {
    throw new Error('没有水果')
  }
}

// 优化
function supply2(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if(!fruit) throw new Error('没有水果啦');     // 条件 1: 当 fruit 无效时，提前处理错误
  if(!redFruits.includes(fruit)) return; // 条件 2: 当不是红色水果时，提前 return
    
  console.log('红色水果');
    
  // 条件 3: 水果数量大于 10 个
  if (quantity > 10) {
    console.log('数量大于 10 个');
  }
}

// 多条件分支的优化处理
function pick(color) { // 改用switch
  // 根据颜色选择水果
  if(color === 'red') {
    return ['apple', 'strawberry']; 
  } else if (color === 'yellow') {
    return ['banana', 'pineapple'];
  } else if (color === 'purple') {
    return ['grape', 'plum'];
  } else {
    return [];
  }
}

// 用switch优化
function pick(color) {
  // 根据颜色选择水果
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

// 使用object优化
const fruitColor = {                        
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
}
function pick(color) {
  return fruitColor[color] || [];
}

// 用map优化
const fruitColor = new Map()
.set('red', ['apple', 'strawberry'])
.set('yellow', ['banana', 'pineapple'])
.set('purple', ['grape', 'plum']);

function pick(color) {
  return fruitColor.get(color) || [];
}

// 语义化优化+filter
const fruits = [
  { name: 'apple', color: 'red' }, 
  { name: 'strawberry', color: 'red' }, 
  { name: 'banana', color: 'yellow' }, 
  { name: 'pineapple', color: 'yellow' }, 
  { name: 'grape', color: 'purple' }, 
  { name: 'plum', color: 'purple' }
];

function pick(color) {
  return fruits.filter(f => f.color == color);
}

// 使用数组新特性简化逻辑判断
// 多条件判断
function judge(fruit) {
  if (fruit === 'apple' || fruit === 'strawberry' || fruit === 'cherry' || fruit === 'cranberries' ) {
    console.log('red');
  }
}
// 使用includes，先抽象成数组
const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
function judge(type) {
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}

// 判断数组中是否所有项都满足某条件
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function match() {
  let isAllRed = true;

  // 判断条件：所有的水果都必须是红色
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color === 'red');
  }

  console.log(isAllRed); // false
}
function match() {
  // 条件：所有水果都必须是红色
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}