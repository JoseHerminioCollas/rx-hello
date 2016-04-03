/** A utility to convert data, JSON from the wire,
 * into a list that is ready to be used for display.
 * @module goatstone/data/convert
 * */
'use strict'
const traverse = require('traverse');
const displayConfig = require( 'goatstone/data/display-config/open-weather-map.js' )

/** @constructor */
function Convert(){}
/**
 * Take a JSON object and flatten it into an object
 * with keys that reflect the values of the location in the JSON object.
 * @param { object } json The JSON object to be flattened
 * @return { object } objElements The flattened JSON to be sent to UI
 * */
Convert.prototype.flattenJSON = function( json ){
    if( !json ) throw 'Argument of JSON object is required.'
    var objElements = {}
    traverse( json ).forEach(function ( e ) {
        if (typeof e === 'string' || typeof e === 'number') {
            objElements[this.path] = e
        }
    })
    return objElements
}
/**
 * Take a list of data values, a list with labels, tranform functions and order values
 * and use it to create a list that will be used for data display.
 * @param { object } flatDataIn A flat map of values derived most likely from .flattJSON
 * @param { object } displayConfig  An object that contains values/functions that will be used to set the displayList
 * @return { array } displayList  A list of values that is ready to be displayed by the UI layer
 * */
Convert.prototype.listToDisplayList = function( flatDataIn, displayConfig ){
    if( !flatDataIn || !displayConfig ) throw 'A list to configure and a labelList to configure it with is required.'
    // iterate through labels, sort labels, create displayContent
    // generate the content for display
    var displayContent = []
    for (var i in flatDataIn) {
        if (displayConfig[i])
            displayContent.push(
                {
                    label: displayConfig[i],
                    value: function(){
                        if( i  === 'sys,sunset' || i === 'sys,sunrise' ) {
                            const dateValueFormatted = (
                                new Date( objElements[i] * 1000 ).toString().substr( 16, 5 )
                            )
                            return dateValueFormatted
                        }
                        return flatDataIn[i]
                    }()
                }
            )
    }
    return displayContent
}

module.exports = Convert