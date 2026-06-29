export enum List {
    one,
    two = 100,
    three = 'three',
    four = 101,
    five
}

export interface Dog {
    name: string;
    age: number;
    height: number;
    weight: number;
}

export type StringOrNumber = string | number;
