let userInput: unknown;
let userName: string;

userInput = 54;
userInput = 'maximum';

if (typeof userInput === 'string') {
  userName = userInput;
}

console.log(userName);

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code }
}

generateError('An error occurred!', 500);
