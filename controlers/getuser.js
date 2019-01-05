const getUserHandle = (req, res, User) => {
  const _id = req.params.id;
  User.findOne({ _id })
    .then(user => {
      if (user) {
        res.status(200).send(user);
      }
    })
    .catch(err => res.status(404).send("User not Found!"));
};

module.exports = getUserHandle;
