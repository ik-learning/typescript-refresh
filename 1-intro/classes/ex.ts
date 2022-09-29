// https://www.typescriptlang.org/docs/handbook/2/classes.html#handbook-content
//
// tsc ex.ts
// node ex.js

class Stark {
  name: string = "Brandon";
  static castle: string = "Winterfell";
  saying: string;

  constructor() {
    this.saying = Stark.castle;
  }

  hello(person: string): void {
    console.log("Hello," + person);
  }
}

var ned = new Stark();

ned.saying = "Winter is Coming...";
console.log(Stark.castle)
console.log(ned);
ned.hello('randomizer person');

// super calls https://www.typescriptlang.org/docs/handbook/2/classes.html#super-calls
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    super();
    console.log(this.k)
  }
}

// inheritance
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  dance() {
    console.log(this.name + " is dancing")
  }
}

var bren = new Person('bren');
bren.dance();

class AwesomePerson extends Person {
  dance() {
    console.log("SO AWESOME");
    super.dance();
  }
}

var robb = new AwesomePerson("Robb");
robb.dance();
