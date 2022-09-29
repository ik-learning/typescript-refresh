// https://www.typescriptlang.org/docs/handbook/2/classes.html#handbook-content
//
// tsc ex.ts
// node ex.js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Stark = /** @class */ (function () {
    function Stark() {
        this.name = "Brandon";
        this.saying = Stark.castle;
    }
    Stark.prototype.hello = function (person) {
        console.log("Hello," + person);
    };
    Stark.castle = "Winterfell";
    return Stark;
}());
var ned = new Stark();
ned.saying = "Winter is Coming...";
console.log(Stark.castle);
console.log(ned);
ned.hello('randomizer person');
// super calls https://www.typescriptlang.org/docs/handbook/2/classes.html#super-calls
var Base = /** @class */ (function () {
    function Base() {
        this.k = 4;
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this) || this;
        console.log(_this.k);
        return _this;
    }
    return Derived;
}(Base));
// inheritance
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.dance = function () {
        console.log(this.name + " is dancing");
    };
    return Person;
}());
var bren = new Person('bren');
bren.dance();
var AwesomePerson = /** @class */ (function (_super) {
    __extends(AwesomePerson, _super);
    function AwesomePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwesomePerson.prototype.dance = function () {
        console.log("SO AWESOME");
        _super.prototype.dance.call(this);
    };
    return AwesomePerson;
}(Person));
var robb = new AwesomePerson("Robb");
robb.dance();
