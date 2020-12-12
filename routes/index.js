const express = require("express");
const Db = require("../models");
const messages = require("../models/messages");
router = express.Router();

router.get("/getloaders", (req, res) => {
  Db.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.get("/serveranypopup", (req, res) => {
  messages.findById("5fd3e352df588f320141179e").then((data) => {
    res.send(data);
  });
});

router.post("/addthiscode", (req, res) => {
  Db.create(req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});
router.put("/like/:loader/:value", (req, res) => {
  var val = req.body.like == "true" ? 1 : -1;
  Db.findOneAndUpdate({ _id: req.params.loader }, { $inc: { likes: val } }).then(res.json({ val: val }));
});
router.delete("/imgoingtodeletethispost/:loader", (req, res) => {
  Db.deleteOne({ _id: req.params.loader }).then(function (data) {
    res.send(data);
  });
});
module.exports = router;
