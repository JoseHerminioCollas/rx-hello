/* goatstone.cloud.cloud */
'use strict'
const async = require( "async" )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )
const mapRemote = require( 'goatstone/remote/task/map' )
const cities = [
	['Seattle', 'seattle'],
	['New York', 'new-york'],
	['Los Angeles', 'los-angeles'],
	['London', 'london' ],
	['Paris', 'paris'],
	['Rome', 'rome'],
	['Ontario', 'ontario'],
	['Madrid', 'madrid'],
	['Denver', 'denver'],
	['Helsinki', 'helsinki'],
	['Tokyo', 'tokyo'],
	['Cleveland', 'cleveland'],
	['Chicago', 'chicago'],
	['Munich', 'munich'],
	['Humboldt', 'Humboldt'],
	['Chatham', 'Chatham'],
	['Urbana', 'Urbana'],
	['Union', 'Union'],
	['Crane', 'Crane'],
	['Tipton', 'Tipton'],
	['Lagrange', 'Lagrange'],
	['Kewanee', 'Kewanee'],
	['Millinocket', 'Millinocket'],
	['Hobart', 'Hobart'],
	['Scotchtown', 'Scotchtown'],
	['Pittsfield', 'Pittsfield']
]

function Cloud(){}
/*
config {object} { city: {string} }
*/
Cloud.prototype.weather = function( config ){
	const c = Object.assign( {}, config )
    return weatherRemote.getPromise( c )
}
Cloud.prototype.weatherR = function( config ){
	return new Promise( function( res, rej ){
		const c = Object.assign( {}, config )
		 weatherRemote.getPromise( c )
			 .then( x => {
				 res( { req: config, res: x } )
		 }, err=>{throw err}, ()=>console.log('cmplt') )
	})
}
Cloud.prototype.map = function( x ){
	return new Promise( function( res, rej ){
		mapRemote.getMap( x )
		res( 1 )
	})
}
Cloud.prototype.city = function(){
	return cities
}
Cloud.prototype.twitter = function(){
    return new Promise( function ( resolve, reject ) {
        resolve( 100 )
    } )
}
module.exports = Cloud
