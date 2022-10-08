type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface IAddFn {
  (a: number, b: number): number;
}

let iAdd: IAddFn;
iAdd = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

interface Another { }

class Person implements Greetable, Another {
  name?: string;
  constructor(name?: string) {
    if (name) {
      this.name = name;
    } else {
      console.log('Hi!')
    }
  }

  greet(phrase: string): void {
    console.log(phrase)
  }
}

console.log(new Person('Mikes'))
