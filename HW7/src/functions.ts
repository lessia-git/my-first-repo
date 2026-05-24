function addElements(elements: (string | number)[]): string | number {
    const initialValue: string | number = typeof elements[0] === 'string' ? '' : 0;
    return elements.reduce((total: string | number, element: string | number): string | number => (total as any) + element, initialValue);
}

const strings: string[] = ['червоний', 'зелений', 'синій'];
const numbers: number[] = [1, 2, 3, 4];
console.log(addElements(strings));
console.log(addElements(numbers));
console.log(addElements([5, 10]));
