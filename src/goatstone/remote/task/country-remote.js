/* goatstone.remote.task.countryRemote */

const countryRemote = {
	id: 111,
	delay: 1000,
	task: cb => {
		setTimeout( () =>{ 
			cb( null, {a: 1} ) 
		}, countryRemote.delay ) 
	} }

module.exports = countryRemote