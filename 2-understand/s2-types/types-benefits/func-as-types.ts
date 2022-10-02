function add(n1: number | string, n2: number | string): number | string {
  return n1.toString() + n2.toString();
}

function printResult(num: number | string): void {
  console.log('Result: ' + num);
}

printResult(add('5','12'))

// let combineValues : Function;
let combineValues: (a: number|string, b: number|string) => number | string;
combineValues = add;

console.log(combineValues(8,8))
