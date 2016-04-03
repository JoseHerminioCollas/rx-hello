/**
 * Configure a request to a remote API and return a promise/data
 * @module goatstone/remote/task/weather-remote
 * @property {string} id An OpenWeatherMap key
 * @property {string} url The URL to use for openweathermap.org
 * @property {string} q A parameter that will be sent to the server
 * @property {function} getData Receives a request object ex { city:'London'} returns a Promise
 */
'use strict'
var config = require( 'goatstone/config' )
const axios = require( 'axios' )

const weatherRemote =  {
	id: config.openWeatherMapKey,
	url: 'http://api.openweathermap.org/data/2.5/weather',
	q: 'London',
	getData: function( x ) {
		if ( !x || !x.city ) throw 'Argument with city value is required'
		this.q = x.city || this.q
		return axios.get(
			`${this.url}?units=metric&q=${this.q}&appid=${this.id}` 
			)
	}
}
module.exports = weatherRemote
