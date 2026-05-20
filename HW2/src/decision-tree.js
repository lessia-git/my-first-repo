const a = 25;
const b = true;
const c = 85;

if (a >= 18) {
    console.log(a);
}

if (a < 18) {
    console.log(a);
} else {
    console.log(b);
}

if (c >= 3) {
    console.log('c >= 3');
} else if (c >= 2) {
    console.log('c >= 2');
} else if (c >= 1) {
    console.log('c >= 1');
} else {
    console.log('c < 1');
}

// //(АБО)
// false || true  // true
// // (І)
// false && true // false
// true && true  // true
// // (НЕ), !! (Спочатку конвертувати в boolean, а потім застосувати операцію НЕ)
// !false  // true
// // ?? (оператор null-об’єднання)
// const a = false ?? 5  // 5
