const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");
// from here
// middleware-plugin 1
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});
// Middleware-plugin 2
app.use((req, res, next) => {
  console.log("hello from middleware 1");
  req.myUserName = "somyagupta.dev";
  next();
});
// middleware 3
app.use((req, res, next) => {
  console.log("hello from middleware 2", req.myUserName);
  // return res.end("hey");
  next();
});

// REST API
app.get("/api/users", (req, res) => {
  console.log(" i am in get route ", req.myUserName);
  return res.json(users);
});

// headers--postman
app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "somya gupta"); //custome header
  // always add x to custom  header
  return res.json(users);
});
// till here
// Route to return user names in an HTML list
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// route to get user by id
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // edit user with id
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Update user data
    users[userIndex] = { ...users[userIndex], ...body };

    // Save changes to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }
      return res.json({ status: "success", user: users[userIndex] });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Remove user from array
    users.splice(userIndex, 1);

    // Save changes to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to delete user" });
      }
      return res.json({ status: "success", message: "User deleted" });
    });
  });
// route to add new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.JSON", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
