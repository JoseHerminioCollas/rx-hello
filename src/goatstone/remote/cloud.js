/* goatstone.cloud.cloud */
'use strict'
const async = require( "async" )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )
const twitterRemote = require( 'goatstone/remote/task/twitter-remote' )
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

/* -
 * Get weather information, then use the lat and lon values to get a map.
 * @param {object} request - An object that represents the request parameters, ex : { city: 'london' }
 */
function Cloud(){}
Cloud.prototype.weather = function( config ){
	const c = Object.assign( {}, config )
    return weatherRemote.getData( c )
}
Cloud.prototype.weatherMap = function( request ){
	const THIS = this
	return new Promise( function( res, rej ){
		 weatherRemote.getData( request )
			.then( x => {
	            THIS.map({
	                center:
	                { 
	                    lat:x.data.coord.lat, lng: x.data.coord.lon
	                }})
			 	res( { req: request, res: x } )
		 	}, err=>{throw err}, ()=>console.log('cmplt') )
	} )
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
Cloud.prototype.twitter = function( request ){
	if (!request || !request.q){ throw 'q value needed' }
	const twitterRequest = { q: 'weather ' + request.q }
	return twitterRemote.getData( twitterRequest )
}
module.exports = Cloud
