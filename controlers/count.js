const Clarifai = require("clarifai");

//User API key
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json("unable to fetch data from api");
    });
};

const countHandle = (req, res, User) => {
  const id = req.body.id;
  User.findOneAndUpdate(
    { _id: id },
    { $inc: { entries: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
        res.status(404).json("User not Found!");
      }
      res.status(200).send(doc);
    }
  );
};

module.exports = { countHandle, handleApiCall };
