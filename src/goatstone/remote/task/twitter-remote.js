/* goatstone.remote.task.twitterRemote */

const twitterRemote = {
	id: 111,
	delay: 3000,
	task:   cb => {
		setTimeout( () =>{ 
			console.log('twitterRemote', twitterRemote.id)  		
			cb() 
		}, twitterRemote.delay ) 
	} }

module.exports = twitterRemote