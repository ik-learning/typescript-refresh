// https://www.typescriptlang.org/docs/handbook/2/functions.html#inference
// tsc ex.ts
// node ex.js
function map(arr, func) {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
var parsed = map(["1", "2", "3"], function (n) { return parseInt(n); });
console.log(parsed);
