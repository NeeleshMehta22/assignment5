"use strict";
exports.__esModule = true;
var express = require('express');
var fs = require('fs');
var router = express.Router();
var myData = JSON.parse(fs.readFileSync("data.json").toString());
router.get('/', function (req, res) {
    res.send(myData);
});
router.post('/', function (req, res) {
    var flag = 0;
    var demo = req.body;
    for (var i = 0; i < myData.length; i++) {
        if (myData[i]["id"] == demo.id) {
            res.sendStatus(404);
            flag = 1;
        }
    }
    if (flag == 0) {
        myData.push(demo);
        var stringifyData = JSON.stringify(myData);
        fs.writeFileSync('data.json', stringifyData);
        res.send(myData);
    }
});
router["delete"]('/:Id', function (req, res) {
    var Id = req.params.Id;
    myData = myData.filter(function (demo) { return demo.id != Id; });
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
});
router.patch('/:Id', function (req, res) {
    var Id = req.params.Id;
    console.log("req", req);
    var user = req.body;
    for (var i = 0; i < myData.length; i++) {
        if (myData[i]["id"] == Id) {
            break;
        }
    }
    myData[i]["firstName"] = user.firstName;
    myData[i]["middleName"] = user.middleName;
    myData[i]["lastName"] = user.lastName;
    myData[i]["email"] = user.email;
    myData[i]["phoneNumber"] = user.phoneNumber;
    myData[i]["role"] = user.role;
    myData[i]["address"] = user.address;
    var stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
});
exports["default"] = router;
