const express = require("express");
const Db = require("../models");
router = express.Router();
router.get("/allloader", (req, res) => {
  Db.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.post("/addthiscode", (req, res) => {
  console.log(req.body.body);
  Db.create(req.body)
    .then(function (data) {
      console.log(data);
      res.json(data);
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.delete("/imgoingtodeletethispost/:loader", (req, res) => {
  Db.deleteOne({ _id: req.params.loader }).then(function (data) {
    res.send(data);
  });
});
module.exports = router;
