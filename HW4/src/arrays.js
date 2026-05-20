const strings = ["червоний", "зелений", "синій"];
const numbers = [1, 2, 3, 4, 5];
const booleans = [true, false, true];
const any = [1, "три", false, null];

strings[1] = "жовтий";
strings.push("зелений");
strings.unshift("білий");
const si = strings.indexOf("синій");
strings.splice(2, 0, "оранжевий");

const last = numbers.pop();
const first = numbers.shift();

booleans[0] = false;
booleans.push(true);
const hasTrue = booleans.includes(true);

const idx = any.findIndex(v => v === false);
const hasNull = any.includes(null);
const mapped = any.map(v => String(v));
const list = [];
any.forEach(v => list.push(v));

console.log(strings, si);
console.log(last, first, numbers);
console.log(booleans, hasTrue);
console.log(idx, hasNull, mapped, list);
