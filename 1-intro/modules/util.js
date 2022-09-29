// tsc utils.ts use_util.ts --out util.js
var Utility;
(function (Utility) {
    var useful = /** @class */ (function () {
        function useful() {
        }
        useful.prototype.timesTwo = function (n) {
            return n * 2;
        };
        return useful;
    }());
    Utility.useful = useful;
})(Utility || (Utility = {}));
/// <reference path="utils.ts">
var use = new Utility.useful;
console.log(use);
