const add_elements = elements => elements.reduce((total, element) => total + element, typeof elements[0] === 'string' ? '' : 0);
const strings = ['червоний', 'зелений', 'синій'];
const numbers = [1, 2, 3, 4];
console.log(add_elements(strings));
console.log(add_elements(numbers));
console.log(add_elements([5, 10]));
