/* goatstone.remote.task.weatherRemote */

var config = require( 'goatstone/config' )
const axios = require( 'axios' )

const weatherRemote = {
	id: config.openWeatherMapKey ,
	q: 'London', // TODO use getter / setter here
	task: cb => {

		axios.get('http://api.openweathermap.org/data/2.5/weather' +
			'?q='+ 
			weatherRemote.q + 
			',&appid=' + 
			weatherRemote.id )
		  .then(function (response) {
			cb( null, response.data ) 
		  })
		  .catch(function (response) {
		    // console.log(response);
		  });
 
	} }

module.exports = weatherRemote