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