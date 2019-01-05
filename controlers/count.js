const countHandle = (req, res, User) => {
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
};

module.exports = countHandle;
