/* text-format-test.js */
const expect = require('chai').expect
const Format = require( 'goatstone/text/format' )

describe( 'Text Format', () => {
	const  f = new  Format()
	const r = f.JSONtoContentList( {name: 'name'})
	it('JSON to display list', () => {
		expect( r ).to.be.an.instanceof( Array )
	})
})