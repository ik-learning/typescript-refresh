// https://www.typescriptlang.org/docs/handbook/2/functions.html#working-with-constrained-values
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
  }
}

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

const arr = combine<string | number>([1, 2, 3], ["hello"]);
