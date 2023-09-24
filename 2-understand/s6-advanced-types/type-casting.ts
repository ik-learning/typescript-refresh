// type casting
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16893896#overview

const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi There!';
}
