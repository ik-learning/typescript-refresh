interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}
let user1: Person;

user1 = {
  name: 'john',
  age: 23,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name)
  }
}
console.log(user1)

user1.greet('Hi there - I am ')
