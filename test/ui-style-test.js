/* test/ui-style */

const expect = require('chai').expect
const appStyle = require( 'goatstone/ui/style/main' )

describe('Main Style Object', x => {

	it('should be an object', () => {
		expect(  appStyle  ).to.be.an.instanceof( Object )
	})

	it('should have required properties', () => {
		expect( appStyle ).to.have.property( 'messageDisplay' )
		expect( appStyle ).to.have.property( 'control' )
		expect( appStyle ).to.have.property( 'weatherDisplay' )
		expect( appStyle ).to.have.property( 'twitterDisplay' )
		expect( appStyle ).to.have.property( 'mapDisplay' )
		expect( appStyle ).to.have.property( 'titleHeader' )
	})
})
