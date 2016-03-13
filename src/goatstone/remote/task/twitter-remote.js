/* goatstone.remote.task.twitterRemote */

const twitterRemote = {
	id: 111,
	delay: 3000,
	task: cb => {
		setTimeout( () =>{ 
			cb( null, twitterRemote ) 
		}, twitterRemote.delay ) 
	} }

module.exports = twitterRemote