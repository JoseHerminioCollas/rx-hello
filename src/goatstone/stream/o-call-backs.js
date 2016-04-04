/* goatstone.stream.o-call-back */
'use strict'

module.exports = {
	error: err => {
		throw err
	},
	complete: x => {
		console.log( 'complete' )
	}
}
