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
router.post("/setpopup", (req, res) => {
  messages.findById(process.env.PASSWORD).then((data) => {
    if (data.password == req.body.password) {
      messages
        .findOneAndUpdate({ _id: process.env.MESSAGE }, { message: req.body.message })
        .then((data) => {
          res.send(`message set to <h4>${data.message}</h4>`);
        })
        .catch(res.send("cannot set the popup"));
    }
  });
});

router.get("/serveranypopup", (req, res) => {
  messages.findById(process.env.MESSAGE).then((data) => {
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
router.put("/like/:loader", (req, res) => {
  var val = req.body.like == "true" ? 1 : -1;
  Db.findOneAndUpdate({ _id: req.params.loader }, { $inc: { likes: val } }).then(res.json({ val: val }));
});
router.post("/imgoingtodeletethispost/:loader", (req, res) => {
  messages.findById(process.env.PASSWORD).then((data) => {
    var password = req.body.password;
    if (data.password === password) {
      Db.deleteOne({ _id: req.params.loader }).then(function (data) {
        res.send(data);
      });
    } else {
      res.send("wrong password");
    }
  });
});

module.exports = router;
