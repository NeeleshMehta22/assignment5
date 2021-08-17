"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var routes_1 = require("./routes");
var port = 8000;
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("UI"));
app.use('/users', routes_1["default"]);
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/user/index.html");
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
