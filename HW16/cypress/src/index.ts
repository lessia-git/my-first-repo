import { doNothing, sum, getCurrentEnumAsString, createNewDog, selectNumbers, selectNumbersForMixedArray, createNewDogWithOptionalParameters, listObjectKeysWithUnknownParameter, listObjectKeysWithObjectParameter, listObjectKeysWithRecordParameter } from './functions';
import { List } from './new-types';

const arrNumbers = [1, 2, 3];
console.log(arrNumbers);

const sumResult = sum(5, 10);
console.log(sumResult);

doNothing();

const value1 = getCurrentEnumAsString(List.one);
console.log(value1);

const value2 = getCurrentEnumAsString(List.two);
console.log(value2);

const value3 = getCurrentEnumAsString(List.three);
console.log(value3);

const value4 = getCurrentEnumAsString(List.four);
console.log(value4);

const value5 = getCurrentEnumAsString(List.five);
console.log(value5);

const value6 = getCurrentEnumAsString('six' as List);
console.log(value6);

const patron  = createNewDog('Patron', 5, 25, 7);
console.log(patron);

const filteredArray = selectNumbers([1, 2, 3, 4]);
console.log(filteredArray);

const filteredArrayWithStringInput = selectNumbers(['1', '2', '3', '4']);
console.log(filteredArrayWithStringInput);

const mixedArray = [1, '2', 3, '4', 5];
const filteredMixedArray = selectNumbersForMixedArray(mixedArray);
console.log(filteredMixedArray);

const arr: (number | string)[] = [1, 2, 3, 4];
arr.push('5');

console.log(createNewDogWithOptionalParameters('Buddy', 3, 20));

console.log(listObjectKeysWithUnknownParameter({ name: 'John', age: 30 }));
console.log(listObjectKeysWithUnknownParameter(1));

console.log(listObjectKeysWithObjectParameter(patron));

console.log(listObjectKeysWithRecordParameter({ name: 'Alice', age: 25, city: 'New York', [Symbol('id')]: 123 }));
