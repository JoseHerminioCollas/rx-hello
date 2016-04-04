/* data-convert-test.js */
const expect = require('chai').expect
const DataConvert = require( 'goatstone/data/convert' )
const openWeatherDisplayConfig = require( 'goatstone/data/display-config/open-weather-map.js' )
const JSONExample = {
    "coord": {
        "lon": -122.33, "lat": 47.61
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    "base": "cmc stations",
    "main": {
        "temp": 16.51, "pressure": 1017, "humidity": 63, "temp_min": 15, "temp_max": 18.78
    },
    "wind": {
        "speed": 1.21, "deg": 69.5
    },
    "clouds": {
        "all": 75
    },
    "dt": 1459712321,
    "sys": {
        "type": 1, "id": 2949, "message": 0.0047, "country": "US", "sunrise": 1459690864, "sunset": 1459737844
    },
    "id": 5809844,
    "name": "Seattle",
    "cod": 200
}
const flatDataIn = {
    "coord,lon": -122.33,
    "coord,lat": 47.61,
    "weather,0,id": 803,
    "weather,0,main": "Clouds",
    "weather,0,description": "broken clouds",
    "weather,0,icon": "04d",
    "base": "cmc stations",
    "main,temp": 16.51,
    "main,pressure": 1017,
    "main,humidity": 63,
    "main,temp_min": 15,
    "main,temp_max": 18.78,
    "wind,speed": 1.21,
    "wind,deg": 69.5,
    "clouds,all": 75,
    "dt": 1459712321,
    "sys,type": 1,
    "sys,id": 2949,
    "sys,message": 0.0047,
    "sys,country": "US",
    "sys,sunrise": 1459690864,
    "sys,sunset": 1459737844,
    "id": 5809844,
    "name": "Seattle",
    "cod": 200
}
describe( 'Data Convert', () => {
    const dataConvert = new  DataConvert()

    describe( 'flattenJSON', () => {

        const displayValues = dataConvert.flattenJSON( JSONExample  )

        it('return an object with a single level from a multilevel JSON object.', () => {
            expect( displayValues ).to.be.an.instanceof( Object )
        })
        it('return an object with only values of type string and number', () => {
            const hasStrNumOnly = Object
                .keys( displayValues )
                .map( ( c, i, a ) => {
                  return displayValues[ c ]
                })
                .every( ( c, i, a ) => {
                    return typeof c === 'number' || typeof c === 'string'
                })
            expect( hasStrNumOnly ).to.be.true
        })
        it('should have keys that reflect the values location in original JSON object.', () => {
            expect( displayValues ).to.have.property( 'name' )
            expect( displayValues ).to.have.property( 'sys,id' )
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
        it('should have items that are ojects ', () => {
            expect( dd[ 0 ] ).to.be.an.instanceof( Object )
        })
        it( 'the items should have a property label that is a string', () => {
            "use strict";
            expect( dd[0].label ).to.be.a( 'string' )
        })
    } )
})



