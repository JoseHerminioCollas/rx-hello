/* goatstone.remote.async-tasks */
'use strict'
const async = require( "async" )
//       taskFactory.get     getTask( 'twitter' )
const twitterRemote = require( 'goatstone/remote/task/twitter-remote' )
const countryRemote = require( 'goatstone/remote/task/country-remote' )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )

const tasks = [ 
	weatherRemote, 
	twitterRemote, 
	countryRemote
]

async.parallel( tasks.map( e => { 
	return e.task 
} ), onComplete )

function onComplete(){
	console.log("complete. . .")
}
