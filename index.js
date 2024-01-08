// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

function dateJson(date) {
  let newDate;
  if (date === undefined) {
    newDate = new Date();
  } else if (!isNaN(Number(date))) {
    newDate = new Date(Number(date));
  } else {
    newDate = new Date(date);
  }
  return newDate.toString() === "Invalid Date"
    ? { error: newDate.toString() }
    : { unix: newDate.getTime(), utc: newDate.toUTCString() };
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/api", function (req, res) {
  res.json(dateJson());
});
app.get("/api/:date", function (req, res) {
  res.json(dateJson(req.params.date));
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("*", function (req, res) {
  res.status(404).send("Not Found");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
