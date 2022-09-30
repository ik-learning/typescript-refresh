// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888074#overview

enum Role { ADMIN = 5, READ_ONLY, AUTHOR };

const person3: {
  name: string,
  age: number,
  role: Role
} = {
  name: 'Maximilian',
  age: 30,
  role: Role.ADMIN
};

if (person3.role === Role.AUTHOR) {
  console.log('is author')
}
