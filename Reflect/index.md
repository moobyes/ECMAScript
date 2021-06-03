<!--
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-07-21 00:49:48
 * @LastEditTime: 2020-07-21 11:06:42
 * @LastEditors: Moobye
--> 
# Reflect 对象的学习文档

> Reflect对象无法构造，就是不能 new
> Reflect和proxy handler的属性一样，很多方和Object一样，比如defineProperty

## 先罗列一下它带的静态方法：
```js
Reflect.apply(target, thisArgument, argumentList) // 同 Function.apply()

const arrs = [1, 2, 3, 4]
const min = Reflect.apply(Math.min, arrs, arrs)
console.log(min) // 1

Reflect.construct()

```

