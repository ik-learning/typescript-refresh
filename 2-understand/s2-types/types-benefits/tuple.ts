const person2: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string]
} = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['sports', 'cooking'],
  role: [2, 'author']
};

person2.role = [10, 'admin'];
