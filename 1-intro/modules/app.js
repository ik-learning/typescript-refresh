"use strict";
// https://www.typescriptlang.org/docs/handbook/2/modules.html
//
// tsc ap.ts
// node app.js
exports.__esModule = true;
var hello_1 = require("./hello");
(0, hello_1["default"])();
var maths_1 = require("./maths");
console.log(maths_1.pi);
var absPhi = (0, maths_1.absolute)(maths_1.phi);
console.log(absPhi);
var maths_2 = require("./maths");
console.log(maths_2.pi);
