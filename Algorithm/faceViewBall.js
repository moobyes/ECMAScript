/*
 * @Description: 面试题
 * @Author: Moobye
 * @Date: 2021-01-31 21:22:38
 * @LastEditTime: 2021-02-01 10:28:16
 * @LastEditors: Moobye
 */

const arr = [13, 1, 14, 2, 6, 3, 1, 3];
// 请用算法实现，从给定的无序，不重复的数组data中，取出n个数，使其相加，并给出算法的时间/空间复杂度

/**
 * 解题思路：从array中取出n个数全排列，在取的同时判断是否符合条件，为了不影响后续排列，每次递归完成，将当前的数组添加到正在排序的array中
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * @param {Array}
 * @param {number}
 * @param {number}
 * @param {array}
 * @return {*}
 */

function getAllCombine(array, n, sum, temp) {
  // 如果temp的长度和要求的个数相等，就进入判断
  // 将temp的数据加起来，如果等于想要的和，就返回temp
  // 否则，默认返回false
  if (temp.length === n) {
    if (temp.reduce((t, c) => t + c) === sum) {
      console.log("temp :>> ", temp);
      return temp;
    }
    return false;
  }

  for (let i = 0; i < array.length; i++) {
    const current = array.shift();
    current < sum && temp.push(current);
    console.log("temp1 :>> ", temp);
    const result = getAllCombin(array, n, sum, temp); // 这里拿到返回的值，为false就在后面将最后一位pop出去
    console.log("result1:>> ", result);
    if (result) {
      console.log("result2 :>> ", result);
      return result;
    }
    temp.pop();
    console.log("temp2 :>> ", temp);
    array.push(current);
  }
}

function getResult(data, n, sum) {
  if (n == 0 && sum == 0) {
    return true;
  }
  if (n < 0) {
    return false;
  }
  if (n > 0) {
    for (var i = 0; i < data.length; i++) {
      var temp = data.slice(i + 1, data.length);

      return getResult(temp, n - 1, sum - data[i]) || getResult(temp, n, sum);
    }
  }
}

function getAllCombin2(array, n, sum) {
  let res = null;
  function backtrack(nums, track, sum1) {
    if (track.length === n && sum1 === sum) {
      res = track.slice();
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (track.indexOf(nums[i]) === -1) {
        track.push(nums[i]);
        backtrack(nums, track, sum1 + nums[i]);
        track.pop();
      }
    }
  }
  backtrack(array, [], 0);
  if (res === null) {
    return false;
  } else {
    return res;
  }
}

// console.log(getAllCombine(arr, 4, 19, []));
console.log(getResult(arr, 4, 19));
// console.log(getAllCombin2(arr, 4, 33))

// 经典回溯法
function getAllCombin(array, n, sum) { 
  let res = null;

  function isValid(item, track) {
    return track.indexOf(item) === -1;
  }

  function backtrack(nums, track, sum1) {
    if (track.length === n && sum1 === sum) {
      res = track.slice();
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (isValid(nums[i], track)) {
        track.push(nums[i]);
        backtrack(nums, track, sum1 + nums[i]);
        track.pop();
      }
    }
  }

  backtrack(array, [], 0);
  return res;
}
