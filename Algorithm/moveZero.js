var moveZeroes = function(numbs) {
  let len = numbs.length
  for(let i = len - 1; i >= 0; i--) {
    if(!numbs[i]) {
      numbs.splice(i, 1)
      numbs.push(0);
    }
  }
};
let arr = [2, 0,0,3,12]
moveZeroes(arr)
console.log('arr', arr)