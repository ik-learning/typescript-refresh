// https://www.typescriptlang.org/docs/handbook/2/modules.html
//
// tsc ap.ts
// node app.js

import helloWorld from "./hello";

helloWorld();

import { pi, phi, absolute } from "./maths";

console.log(pi);
const absPhi = absolute(phi);
console.log(absPhi);

import { pi as π } from "./maths";

console.log(π);

import { Cat, Dog } from "./animal";
type Animals = Cat | Dog;
