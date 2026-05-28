"use strict";
function addElements(elements) {
    const initialValue = typeof elements[0] === 'string' ? '' : 0;
    return elements.reduce((total, element) => total + element, initialValue);
}
const strings = ['червоний', 'зелений', 'синій'];
const numbers = [1, 2, 3, 4];
console.log(addElements(strings));
console.log(addElements(numbers));
console.log(addElements([5, 10]));
//# sourceMappingURL=functions.js.map