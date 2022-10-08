"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let iAdd;
iAdd = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(name) {
        if (name) {
            this.name = name;
        }
        else {
            console.log('Hi!');
        }
    }
    greet(phrase) {
        console.log(phrase);
    }
}
console.log(new Person('Mikes'));
