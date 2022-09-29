// https://www.typescriptlang.org/docs/handbook/2/functions.html#inference
// tsc ex.ts
// node ex.js
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed)
