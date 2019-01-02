const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const mongoose = require("mongoose");

//Load User model
require("./User");
const User = mongoose.model("users");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  User.find((err, users) => {
    res.send(users);
  });
});

//Sign In
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error login in");
  }
});

//Register
app.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  const user = new User();

  user.name = name;
  user.email = email;
  user.password = password;
  user
    .save()
    .then(console.log(user))
    .then(res.send(user))
    .catch(err => console.log(err));

  // database.users.push({
  //   id: "3",
  //   name: name,
  //   email: email,
  //   // password: password,
  //   entries: 0,
  //   joined: new Date()
  // });
  // res.json(database.users[database.users.length - 1]);
});

//Get User by ID
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

//Increase count of uploaded images
app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("not found");
  }
});

mongoose
  .connect(
    "mongodb+srv://eugenebutenko:147258369aA@cluster0-pzpqx.mongodb.net/facerecognition?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB connected"))
  .then(() => {
    app.listen(3000, () => console.log("Server is running on 3000"));
  })
  .catch(err => console.log(err));
