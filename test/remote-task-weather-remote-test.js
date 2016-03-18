/* remote-task-weather-remote-test.js */

const expect = require( 'chai' ).expect
const weatherRemote = require( 'goatstone/remote/task/weather-remote' )

describe( 'Weather Remote Data', x => {
	var json
	beforeEach( (done) => {
		weatherRemote.getPromise()
		.then ( x => {
		 	json = x.data
			done()			
		})
	})
	it( 'should return a JSON object', () => {
		expect( json ).to.a( 'object' )
	} )
	it( 'should have a prop name of type strng ', () => {
		expect( json.name ).to.a( 'string' )
	} )

} )
