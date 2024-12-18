const fs = require("fs");
// sync
// fs.writeFileSync("./test.txt", "hey somya");

// async;
// fs.writeFile("./test.txt", "hey somya async ", (err) => {});

// read sync
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// read async
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(result);
//   }
// });

// append
fs.appendFileSync("./test.txt", `${Date.now()} hey There\n`);

// copy
fs.cpSync("./test.txt", "./copy.txt");

//delete
// fs.unlinkSync("./copy.txt");

// all info about file
console.log(fs.statSync("./test.txt"));

// to create folder
// fs.mkdirSync('my-docs')

// to create recursive folder
// fs.mkdirSync('my-docss/a/b',{recursive:true});
