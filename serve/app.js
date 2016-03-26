'use strict';

var path = require('path');
var express = require('express');
var config = require('./config')();
var app = express();
app.disable('etag');

var host = '192.168.1.141'
var port = 8080

app.use(express.static( __dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile( __dirname + '/public/index.html' )
});

var server = app.listen( 8080, function () {
  console.log('App listening at http://%s:%s', host, port);
});

