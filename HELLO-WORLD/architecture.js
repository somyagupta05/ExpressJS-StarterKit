const fs = require("fs");

// console.log("1");
// // read sync blocking
// const result = fs.readFileSync("contacts.txt", "utf-8");
// console.log(result);

// console.log("2");
// output: 1 filecontent  2
// ..................................................
// non blocking
console.log("1");
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  console.log(result);
});
console.log("2");
console.log("3");
console.log("4");

// output: 1 2 3 4 filecontent

// default thread pool size=4
//max ? 12 core cpu-12    ---run it to get
// const os = require("os");
// console.log(os.cpus().length);
