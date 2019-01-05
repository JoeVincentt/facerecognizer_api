const signinHandle = (req, res, bcrypt, User) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission!");
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.status(404).json("User not found!");
      return;
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then(response => {
        if (response === true) {
          res.status(200).send(user);
        } else {
          res.status(400).json("Failed Log In!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = {
  signinHandle: signinHandle
};
