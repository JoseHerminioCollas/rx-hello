/* goatstone.util.o-call-back */
'use strict'

module.exports = {
	error: err => {
		console.log('error ', err)
	},
	complete: x => {
		console.log( 'complete' )
	}
}
