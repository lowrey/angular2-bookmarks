import express = require("express");
import path = require("path");
import bodyparser = require("body-parser");
var database = require("tingodb")().Db;
var port: number = process.env.PORT || 3000;
var app = express();
app.use(bodyparser.json());
var db = new database(path.resolve(__dirname, "assets"), {});
var collection = db.collection("links");

app.use("/app", express.static(path.resolve(__dirname, "app")));
app.use("/libs", express.static(path.resolve(__dirname, "libs")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.get("/api/links", (req: express.Request, res: express.Response) => {
  collection.find({}, (err, items) => {
    if (err) {
      res.json(err);
    }
    else {
      items.toArray((err, items2) => res.json(items2));
    }
  });
});

app.get("/api/link/:id", (req: express.Request, res: express.Response) => {
  collection.findOne({ _id: Number(req.params.id) }, (err, item) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json(item);
    }
  });
});

app.post("/api/link", (req: express.Request, res: express.Response) => {
  collection.insert([req.body], (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

app.put("/api/link/:id", (req: express.Request, res: express.Response) => {
  collection.update({ _id: Number(req.params.id) }, req.body, (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

app.delete("/api/link/:id", (req: express.Request, res: express.Response) => {
  collection.remove({ _id: Number(req.params.id) }, (err, result) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

app.get("/api/*", (req: express.Request, res: express.Response) => {
  res.send("welcome to the api");
});
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

var server = app.listen(port, () => {
  //var host = server.address().address;
  var port = server.address().port;
  console.log("This express app is listening on port:" + port);
});
