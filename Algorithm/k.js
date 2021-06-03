// 链表中倒数第k个节点

let arr = [1, 2, 3, 4, 5] 
let k = 2

var getKthFromEnd = function(head, k) {
  var stack = []
  var ans = []
  while(head) {
      stack.push(head)
      head = head.next 
  }
  if (k > 0) {
      var k = stack.pop()
      ans.push(k)
      k--
  }
  return ans
};

const n = getKthFromEnd(arr, k)
console.log('n :>> ', n);