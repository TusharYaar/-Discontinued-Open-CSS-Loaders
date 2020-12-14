const express = require("express");
const connection = require("../models");

router = express.Router();

router.get("/getloaders", (req, res) => {
  connection.query("select * from loaders", function (err, result) {
    if (err) {
      res.send("ERROR");
    }
    res.send(result);
  });
});
router.post("/setpopup", (req, res) => {
  connection.query("select * from others", function (err, result) {
    if (req.body.password === result[1].content) {
      connection.query("UPDATE others SET content = ? WHERE mtype = 'MESSAGE'", req.body.message, function (err, result) {
        res.send(result);
      });
    } else {
      res.send("Wrong Password");
    }
  });
});

router.get("/serveranypopup", (req, res) => {
  connection.query("select content from others where mtype='MESSAGE'", function (err, result) {
    if (err) res.send("NO");
    else res.send(result[0].content);
  });
});

router.post("/addthiscode", (req, res) => {
  var post = req.body;
  console.log(post);
  connection.query("INSERT INTO loaders SET ?", post, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});
router.post("/updatecode", (req, res) => {
  connection.query("Select * from others where mtype = 'PASSWORD'", (err, result) => {
    if (req.body.password != result[0].content) {
      res.send("NO");
    } else {
      connection.query("UPDATE loaders SET html = ?, css = ?, lname =?, contributor = ? where loaderid = ?", [req.body.html, req.body.css, req.body.lname, req.body.contributor, req.body.loaderid], function (err, result) {
        if (err) {
          console.log(err);
          res.send("Error");
        } else res.send("Done");
      });
    }
  });
});

router.put("/like/:loader", (req, res) => {
  var val = req.body.like == "true" ? 1 : -1;
  connection.query("UPDATE loaders SET likes = likes + ? WHERE loaderid = ?", [val, req.params.loader], (err, result) => {
    if (err) res.send(err);
    else res.json({ val: val });
  });
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
router.get("/setthis", (req, res) => {
  connection.query("INSERT INTO others values('MESSAGE','NO')", function (err, result, field) {
    res.send(result);
  });
});
module.exports = router;
