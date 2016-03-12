/* goatstone.remote.task.weatherRemote */

var config = require( 'goatstone/config' )

const weatherRemote = {
	id: config.openWeatherMapKey ,
	q: 'London', // TODO use getter / setter here
	task:   cb => {
		console.log( 'qqq', weatherRemote.q)
		const axios = require( 'axios' )

		axios.get('http://api.openweathermap.org/data/2.5/weather' +
			'?q='+ 
			weatherRemote.q + 
			',&appid=' + 
			weatherRemote.id )
		  .then(function (response) {
		  	const br = response.data 
		    console.log( br.wind );
			cb() 
		  })
		  .catch(function (response) {
		    console.log(response);
		  });
 
	} }

module.exports = weatherRemote