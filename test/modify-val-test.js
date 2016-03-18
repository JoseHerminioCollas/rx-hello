/* modify-val-test.js */

const expect = require( 'chai' ).expect
const ModifyVal = require( 'goatstone/util/modify-val' )

describe( 'ModifyVal', ( )=> {
	describe( 'return a greater nuber than the one recieved', () => {
		it( 'return a greater nuber than the one recieved', () => {
			const mv =  new ModifyVal()
			const fistVal = 0 
			const secondVal = mv.increase( fistVal )
			expect( secondVal ).above( fistVal )
		} )
	})
} )