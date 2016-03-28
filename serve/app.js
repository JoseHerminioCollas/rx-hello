'use strict';

var express = require('express');
var config = require('./config')();
var twitterConfig = require( './twitter-config')
var app = express();
app.disable('etag');
app.set('trust proxy', true);
var TwitterRemote = require( './remote/twitter' )

app.use(express.static( __dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile( __dirname + '/index.html' )
});
app.get('/weather/twitter/:q', function( req, res ){
    console.log('qqqqq', req.params.q )
    var twitter = new TwitterRemote( twitterConfig )
    twitter.getSearch(
        {
            'q': req.params.q,
            'count': 10
        }, TwitterRemote.error, function( data ){
            res.send( data )
        })
})
if (module === require.main) {
    // Start the server
    var server = app.listen( 8080, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
}
