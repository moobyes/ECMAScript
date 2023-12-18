# 斐波那契数列

> 剑指offer题目： 求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）
>
方法一：

```js
function Fibonacci(n) {
  if (n <= 1) {
    return n
  }

  let i = 1, pre = 0, current = 1, result = 0;
  while(i++ < n) {
    result = pre + current;

    // 重置前面两个值
    pre = current; // 当前值塞给前一个值
    current = result; // 结果塞给当前值
  }
  return result;
}

```

方法二：

```js
// 将重复的值变成参数以避免重复计算
function fibonacci(n) {
  function fib(n, v1, v2) {
    if (n === 1) {
      return v1
    }
    if (n === 2) {
      return v2
    } else {
      return fib(n - 1, v2, v1+v2)
    }
  }
  return fib(n, 1, 1)
}
```

方法三：

```js
const fibonacci = function () {
    let memo = [0, 1];
    let fib = function (n) {
      console.log(n)
        if (memo[n] == undefined) {
            memo[n] = fib(n - 2) + fib(n - 1)
        }
        return memo[n]
    }
    return fib;
}()
fibonacci(30)
```

