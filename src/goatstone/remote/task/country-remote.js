/* goatstone.remote.task.countryRemote */

const countryRemote = {
	id: 111,
	delay: 1000,
	task:   cb => {
		setTimeout( () =>{ 
			console.log('countryRemote', countryRemote.id)  		
			cb() 
		}, countryRemote.delay ) 
	} }

module.exports = countryRemote