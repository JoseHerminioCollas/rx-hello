/* goatstone.remote.async-tasks */
'use strict'

const twitterRemote = require( 'goatstone/remote/task/twitter-remote' )
const countryRemote = require( 'goatstone/remote/task/country-remote' )
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )

weatherRemote.q = 'Cleveland'

const tasks = [ 
	weatherRemote, 
	twitterRemote, 
	countryRemote
]

module.exports = tasks