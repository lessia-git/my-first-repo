function add_elements(elements) {
    const initialValue = typeof elements[0] === 'string' ? '' : 0;
    return elements.reduce((total, element) => total + element, initialValue);
}

const strings = ['червоний', 'зелений', 'синій'];
const numbers = [1, 2, 3, 4];
console.log(add_elements(strings));
console.log(add_elements(numbers));
console.log(add_elements([5, 10]));
