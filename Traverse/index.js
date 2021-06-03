/*
 * @Description: 深度遍历以及广度遍历
 * @Author: Moobye
 * @Date: 2021-05-19 17:40:30
 * @LastEditTime: 2021-05-19 18:01:50
 * @LastEditors: Moobye
 */
// 什么是深度优先遍历？
// 是指从某个定点触发，首先访问这个定点，然后找出刚访问这个节点的第一个未被访问的领节点，然后再以此领节点为定点，继续找它的下一个定点警醒访问。重复此步骤，直至所有的节点都被访问完为止。
// 代码演示如下：
function deepTraversal(node) {
  let nodes = []
  if (node !== null) {
    nodes.push(node)
    let childrens = node.children
    for(let i = 0; i < childrens.length; i++) {
      deepTraversal(childrens[i])
    }
  }
  return nodes;
}
// function deepTraversal(node) { 
//   let nodes = []
//   if (node != null) {
//     nodes.push(node)
//     let childrens = node.children
//     for (let i = 0; i < childrens.length; i++) deepTraversal(childrens[i])
//   }
//   return nodes
// }
// 非递归遍历
function deepTraversal1(node) {
  let nodes = []
  if (node !== null) {
    stack = []
    stack.push(node)
    while(stack.length !== 0){
      let item = stack.pop()
      nodes.push(item)
      let childrens = item.children
      for(let i = childrens.length - 1; i>= 0; i--) stack.push(childrens[i])
    }
  }
}

// 广度遍历是啥？
// 是从某个顶点触发，首先访问顶点，然后找出刚访问这个节点所有未被访问的邻节点，访问完后再访问这些节点中的第一个邻节点的所有节点，重复此方法，知道所有节点都被访问
function wideTraversal(node){
  let nodes = [], i = 0
  if (node !== null) {
    nodes.push(node)
    wideTraversal(node.nextElementSibling)
    node = nodes[i++]
    wideTraversal(node.firstElementChild)
  }
  return nodes;
}

function wideTraversal1(node) {
  let nodes = [], i = 0
  while (node !== null) {
    nodes.push(node)
    node = nodes[i++]
    let childrens = node.children
    for (let i = 0; i < childrens.length; i++) {
      node.push(childrens[i])
    }
  }
  return nodes;
}