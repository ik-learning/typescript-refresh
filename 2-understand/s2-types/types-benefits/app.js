function combine(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        return +input1 + +input2;
    }
    else {
        return input1.toString() + input2.toString();
    }
}
var combineAges = combine(30, 26, 'as-number');
console.log(combineAges);
var combineStringAges = combine('30', '26', 'as-number');
console.log(combineStringAges);
var combineNames = combine('Max', 'Anna', 'as-text');
console.log(combineNames);
