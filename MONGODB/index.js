const express = require("express");
const mongoose = require("mongoose");

// const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;
// connection
mongoose
  .connect("mongodb://localhost:27017/youtube-app-1")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));
// schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// schmea model
const User = mongoose.model("user", userSchema);

// middleware-plugin
app.use(express.urlencoded({ extended: false }));
// Route to return JSON data (REST API)
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// Route to return user names in an HTML list
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstName}-${user.email}</li>`)
        .join("")}
    </ul>
  `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // res.setHeader("X-MyName", "Somya Gupta");
  return res.json(allDbUsers);
});

// route to get user by id
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  });
// route to add new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  // console.log("result", result);
  return res.status(201).json({ msg: "success" });
});
// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
