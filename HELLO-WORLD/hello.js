// method 1
// const math = require("./math");
// console.log(math.sub(2, 5));
// console.log(math.add(2, 5));
// .........................................
// method 2
// const math = require("./math");
// console.log(math.subfn(2, 5));
// console.log(math.addfn(2, 5));
// .........................................
// method 3
const { add, sub } = require("./math");
console.log(sub(2, 5));
console.log(add(2, 5));
