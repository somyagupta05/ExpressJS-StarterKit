// creating server
// const http = require("http");
// const myServer = http.createServer((req, res) => {
//   // console.log("new request rec");
//   console.log(req.headers);
//   res.end("hello from server again");
// });
// myServer.listen(8000, () => console.log("server started"));
// ...............................................
// log file

// const http = require("http");
// const fs = require("fs");
// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const log = `${Date.now()}:${req.url}New Req Received\n`;
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (req.url) {
//       case "/":
//         res.end("homepage");
//         break;
//       case "/about":
//         res.end("i am somya gupta");
//         break;
//       default:
//         res.end("404 not found ");
//     }
//     // res.end("hello from server again ");
//   });
// });
// myServer.listen(8000, () => console.log("server started"));
// ................................................
// url
// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {
//   if (req.url === "/favicon.ico") return res.end();
//   const myUrl = url.parse(req.url, true);
//   const log = `${Date.now()}:${req.url}New Req Received\n`;
//   fs.appendFile("log.txt", log, (err, data) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("homepage");
//         break;
//       case "/about":
//         const username = myUrl.query.myname;
//         res.end(`hi ,${username}`);
//         break;
//       case "/search":
//         const search = myUrl.query.search_query;
//         res.end("here are your results for " + search);
//       default:
//         res.end("404 not found ");
//     }
//     // res.end("hello from server again ");
//   });
// });
// myServer.listen(8000, () => console.log("server started"));
// ...............................................
// HTTP METHOD
const http = require("http");
const fs = require("fs");
const url = require("url");

function myHandler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url, true);
  const log = `${Date.now()}:${req.method} ${req.url} New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "Get") res.end("homepage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`hi ,${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("here are your results for " + search);
      case "/signup":
        if (req.method === "GET") res.end("this is signup form");
        else if (req.method === "POST") {
          res.end("Success");
        }
      default:
        res.end("404 not found ");
    }
  });
}
const myServer = http.createServer(myHandler);
myServer.listen(8000, () => console.log("server started"));
