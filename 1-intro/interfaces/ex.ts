// https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
// https://www.typescriptlang.org/docs/handbook/interfaces.html
// tsc ex.ts
// node ex.js

interface Stark {
  name: string;
  age?: number; // optional parameter
}

function printName(stark: Stark) {
  console.log(stark.name)
}

printName({ name: "Eddard" });
// printName({ label: "Joe" }); // TS2345: Argument of type '{ label: string; }' is not assignable to parameter of type 'Stark'.

// read only
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Cannot assign to 'x' because it is a read-only property.


interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // could also have any number of other properties, then we could define it like so
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

// Interface Function types https://www.typescriptlang.org/docs/handbook/interfaces.html#function-types
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (source: string, input: string): boolean {
  let result = source.search(input);
  return result > -1;
};
