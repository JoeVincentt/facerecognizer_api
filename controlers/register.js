const handleRegister = (req, res, bcrypt, User) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission!");
  } else {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        res.status(400);
        return;
      }

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
    });
  }
};

module.exports = {
  handleRegister: handleRegister
};
