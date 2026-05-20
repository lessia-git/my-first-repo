const v = 'b';
let r;

switch (v) {
    case 'a':
        r = 1;
        break;
    case 'b':
        r = 2;
        break;
    case 'c':
        r = 3;
        break;
    default:
        r = 0;
}

console.log(r);
// switch (<стала змінна>) {
//     case 'значення 1': {
//         <код 1>;
//         break;
//     }
//     ...
//     default: {
//         <якщо необхідна якась стандартна логіка, коли не попали в case>
//     }
// }
