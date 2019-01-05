const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");

//Load our controllers
const register = require("./controlers/register");
const signin = require("./controlers/signin");
const getuser = require("./controlers/getuser");
const count = require("./controlers/count");

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
  signin.signinHandle(req, res, bcrypt, User);
});

//Register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, User);
});

//Get User by ID
app.get("/profile/:id", (req, res) => {
  getuser.getUserHandle(req, res, User);
});

//Increase count of uploaded images
app.put("/image", (req, res) => {
  count.countHandle(req, res, User);
});

//Image handle request
app.post("/imageurl", (req, res) => {
  count.handleApiCall(req, res);
});

mongoose
  .connect(
    process.env.MONGO,
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB connected"))
  .then(() => {
    app.listen(3000, () => console.log("Server is running on 3000"));
  })
  .catch(err => console.log(err));
