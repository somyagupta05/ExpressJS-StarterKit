const fs = require("fs");
function longReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
}
module.exports = { longReqRes };
