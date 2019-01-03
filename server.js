const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
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
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(404).send("User not found!");
      return;
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then(response => {
        if (response === true) {
          res.status(200).send(user);
        } else {
          res.status(400).send("Failed Log In!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

//Register
app.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      res.status(400).send("User exists!");
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(use => {
              res.send(newUser);
            })
            .catch(err => {
              console.log(err);
              return;
            });
        });
      });
    }
  });
});

//Get User by ID
app.get("/profile/:id", (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then(user => {
      if (user) {
        res.status(200).send(user);
      }
    })
    .catch(err => res.status(404).send("User not Found!"));
});

//Increase count of uploaded images
app.put("/image", (req, res) => {
  const id = req.body.id;
  User.findOneAndUpdate(
    { _id: id },
    { $inc: { entries: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
        res.status(404).send("User not Found!");
      }
      res.status(200).send(doc);
    }
  );
});

mongoose
  .connect(
    `mongodb+srv://eugenebutenko:147258369aA@cluster0-pzpqx.mongodb.net/facerecognition?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB connected"))
  .then(() => {
    app.listen(3000, () => console.log("Server is running on 3000"));
  })
  .catch(err => console.log(err));
