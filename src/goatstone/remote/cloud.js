/* goatstone.cloud.cloud */
'use strict'
const Rx = require( 'rx' )
const async = require( "async" )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )

function Cloud(){
    this.owKey = 'owkey'
}
Cloud.prototype.weather = function(){

    return weatherRemote.getPromise()
}
Cloud.prototype.twitter = function(){
    return new Promise( function ( resolve, reject ) {
        resolve( 100 )
    } )
}
module.exports = Cloud
