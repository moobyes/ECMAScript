/*
 * @Description: 链表
 * @Author: Moobye
 * @Date: 2020-08-15 08:43:50
 * @LastEditTime: 2020-08-15 11:42:59
 * @LastEditors: Moobye
 */
class LinkedList{
  constructor(equalsFn){
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  push(element){
    const node = new Node(element) // 生成节点
    let current // 定义当前值字面量
    if(this.head == null) { // 当前链表为空时，也可以用this.count === 0 来判断
      this.head = node // 讲要插入的节点赋值给链表的头
    } else { // 单前链表不为空
      current = this.head // 先赋值当前值
      while(current.next != null) { // 当前值不是最后一个节点，就一直往下便利，直到找到最后的节点
        current = current.next // 不是最后节点，改变当前值以便遍历
      }
      current.next = node // 是最后一个值的时候，将新节点赋值给原先老的链表的最后一个值的链
    }
    this.count++ // 当前链表节点数加一
  }

  

}

class Node{
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

const list = new LinkedList()
list.push(10)
list.push(15)
console.log('list :>> ', list);