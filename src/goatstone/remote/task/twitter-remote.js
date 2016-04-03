/**
 * Configure a request to the local server api /weather/twitter, returns a promise/data
 * @module goatstone/remote/task/twitter-remote
 * @property {string} url The URL to use for the local API server
 * @property {string} q A parameter that will be sent to the server
 * @property {function} getData Receives a request object ex { q:'London weather'} returns a Promise
 */
'use strict'
const axios = require( 'axios' )

const twitterRemote =  {
	url: '/weather/twitter/',
	q: 'detroit',
	getData: function( x ) {
		if (!x || !x.q){ throw 'q value needed' }
		this.q = x.q || this.q
		return axios.get(
			`${this.url}${this.q}`
		)
	}
}
module.exports = twitterRemote