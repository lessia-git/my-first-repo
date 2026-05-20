const a = undefined;
const b = 7;
const c = 'Рядок';
const d = true;
const e = false;
const f = 3;
const g = '5';

console.log(a || b);
console.log(c && d);
console.log(d && e);

console.log(f > 2);
console.log(f < 5);
console.log(f >= 3);
console.log(f <= 3);
console.log(g == b);
console.log(f === '3');


// // false || true  // true
// // false && true // false
// // true && true  // true
// // !false  // true
// // const a = false ?? 5  // 5
// // більше
// 1 > 2 // true
// // менше
// 1 < 2 // false
// // більше дорівнює
// 2 >= 2 // true
// // Менше дорівнює
// 2 <= 2 // true
// // дорівнює з приведенням
// 2 == '2' //true
// // дорівнює без приведення
// 2 === '2' // false

