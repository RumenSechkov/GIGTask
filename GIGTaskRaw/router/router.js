var express = require('express');
var path = require('path');

var countries = require('country-list')();

var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/countries', function (req, res) {
    res.send(countries.getNames());
});