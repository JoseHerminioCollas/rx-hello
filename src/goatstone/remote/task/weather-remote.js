/* goatstone.remote.task.weatherRemote */
'use strict'
var config = require( 'goatstone/config' )
const axios = require( 'axios' )

const wr =  {
	id: config.openWeatherMapKey,
	url: 'http://api.openweathermap.org/data/2.5/weather',
	q: 'London', 
	getPromise: x => {
		return axios.get(
			`${wr.url}?q=${wr.q}&appid=${wr.id}` 
			)
	}
}
module.exports = wr