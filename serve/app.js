'use strict';

var express = require('express');
var config = require('./config')();
var appConfig = require( '../src/goatstone/config').twitter
var app = express();
app.disable('etag');
var TwitterRemote = require( './remote/twitter' )
var host = '192.168.0.3'
var port = 8080

app.use(express.static( __dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile( __dirname + '/public/index.html' )
});
app.get('/weather/twitter', function( req, res ){
    var twitter = new TwitterRemote( appConfig )
    twitter.getSearch(
        {
            'q':'detroit weather',
            'count': 10
        }, TwitterRemote.error, function( data ){
            res.send( data )
        })
})
var server = app.listen( 8080, function () {
  console.log('app listening at http://%s:%s', host, port);
});
