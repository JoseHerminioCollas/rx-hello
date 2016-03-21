/* goatstone.cloud.cloud */
'use strict'
const Rx = require( 'rx' )
const async = require( "async" )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )
const mapRemote = require( 'goatstone/remote/task/map' )

function Cloud(){}
Cloud.prototype.weather = function( config ){
	const c = Object.assign( {}, config )
    return weatherRemote.getPromise( c )
}
Cloud.prototype.map = function( x ){
	return new Promise( function( res, rej ){
		mapRemote.getMap( x )
		res( 1 )
	})
}
Cloud.prototype.twitter = function(){
    return new Promise( function ( resolve, reject ) {
        resolve( 100 )
    } )
}
module.exports = Cloud
