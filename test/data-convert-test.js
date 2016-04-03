/* data-convert-test.js */
const expect = require('chai').expect
const DataConvert = require( 'goatstone/data/convert' )
const openWeatherDisplayConfig = require( 'goatstone/data/display-config/open-weather-map.js' )

describe( 'Data Convert', () => {
    const dataConvert = new  DataConvert()
    const testJSON = { "name": "name" }
    const flatDataIn = {'name': 'A Name'}

    describe( 'flattenJSON', () => {
        const displayData = dataConvert.flattenJSON( testJSON  )

        it('should create a flat map of the String and Number values from the JSON', () => {
            expect( displayData ).to.be.an.instanceof( Object )
        })

        it( 'should throw an error if no argument is supplied', () => {
            try{
                const dd = dataConvert.flattenJSON()
            } catch( e ){
                expect( e ).to.be.a( 'string' )
            }
        })
    })

    describe( 'listToDisplayList', () => {
        const dd = dataConvert.listToDisplayList( flatDataIn, openWeatherDisplayConfig )
        it('should receive a list of data and convert it into a list that UI elements can display.', () => {
            expect( dd ).to.be.an.instanceof( Array )
        })
    } )
})