const addElements2 = (elements: (string | number)[]): string | number =>
    elements.reduce(
        (total: string | number, element: string | number): string | number => (total as any) + element,
        (typeof elements[0] === 'string' ? '' : 0) as string | number
    );

const strings2: string[] = ['червоний', 'зелений', 'синій'];
const numbers2: number[] = [1, 2, 3, 4];
console.log(addElements2(strings2));
console.log(addElements2(numbers2));
console.log(addElements2([5, 10]));
