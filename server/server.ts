import express = require("express");
import path = require("path");
var port:number = process.env.PORT || 3000;
var app = express();

app.use("/app", express.static(path.resolve(__dirname, "app")));
app.use("/libs", express.static(path.resolve(__dirname, "libs")));
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.get("/api/*", (req:express.Request, res:express.Response) => {
    res.send("welcome to the api");
});
app.get("/*", (req:express.Request, res:express.Response) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("This express app is listening on port:" + port);
});
