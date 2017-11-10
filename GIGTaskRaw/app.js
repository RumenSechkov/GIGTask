var express = require('express');
var app = express();
var port = 8000;

var router = require('./router/router');

app.use('/', router);
app.use(express.static(__dirname));

app.listen(port, function () {
    console.log('App started. Listening on port :8000')
});