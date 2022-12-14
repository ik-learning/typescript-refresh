// https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#interfaces
// https://www.typescriptlang.org/docs/handbook/interfaces.html
// tsc ex.ts
// node ex.js
function printName(stark) {
    console.log(stark.name);
}
printName({ name: "Eddard" });
var p1 = { x: 10, y: 20 };
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
