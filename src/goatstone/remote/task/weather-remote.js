/* goatstone.remote.task.weatherRemote */

const weatherRemote = {
	id: 99999999999,
	task:   cb => {
		setTimeout( () =>{ 
			console.log('weatherRemote', weatherRemote.id)  		
			cb() 
		}, 2000 ) 
	} }

module.exports = weatherRemote