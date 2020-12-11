const express = require("express"),
  request = require("request"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Db = require("./models"),
  myRoutes = require("./routes"),
  PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
app.use(myRoutes);

app.get("/", (req, res) => {
  res.send("index.html");
});

app.get("/getquote", (req, res) => {
  var url = "https://api.adviceslip.com/advice";
  request(url, (err, result, body) => {
    if (err) throw err;
    else {
      var red = JSON.parse(body);
      res.send(red.slip.advice);
    }
  });
});
app.get("/serveranypopup", (req, res) => {
  res.send("NO");
});

app.post("*", (req, res) => {
  res.send("Not Found the Page you are looking for");
});

app.listen(PORT, () => {
  console.log("listening to port 3000");
});
