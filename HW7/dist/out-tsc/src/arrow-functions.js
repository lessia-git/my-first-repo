"use strict";
const addElements2 = (elements) => elements.reduce((total, element) => total + element, (typeof elements[0] === 'string' ? '' : 0));
const strings2 = ['червоний', 'зелений', 'синій'];
const numbers2 = [1, 2, 3, 4];
console.log(addElements2(strings2));
console.log(addElements2(numbers2));
console.log(addElements2([5, 10]));
//# sourceMappingURL=arrow-functions.js.map