/* goatstone.text.format */
'use strict'
var traverse = require('traverse');

// display these items with labels
var labels = {
  'name': 'City Name',
	'coord,lon': 'Longitude',
	'coord,lat': 'Latitude',
	'weather,0,description': 'Weather Description',
	'main,temp': 'Temerature Celsius',
	'main,humidity': 'Humidity',
	'main,temp_min': 'Minimum Temperature Celsius',
	'main,temp_max': 'Maximum Temperature Celsius',
	'wind,speed': 'Wind Speed',
	'wind,gust': 'Wind Gusts',
	'wind,deg': 'Wind Degree',
	'sys,sunrise': 'Sun Rise',
	'sys,sunset': 'Sun Set'
}
function Format(){}
/*
 * Convert a JSON object into a list of values and labels that will be used for display.
 * @param { JSON Object } jsonObj
 * @return	{ array } displayContent
*/
Format.prototype.JSONtoContentList = function ( jsonObj ){
	var objElements = {}
	traverse( jsonObj ).forEach(function ( e ) {
	    if (typeof e === 'string' || typeof e === 'number') {
	        objElements[this.path] = e
	    }
	})
  // iterate through labels, sort labels, create displayContent
  // generate the content for display
	var displayContent = []
	for (var i in objElements) {
	    if (labels[i])
	        displayContent.push(
            {
              label: labels[i],
              value: function(){
                if( i  === 'sys,sunset' || i === 'sys,sunrise' ) {
                    const dateValueFormatted = (
                      new Date( objElements[i] * 1000 ).toString().substr( 16, 5 )
                     )
                    return dateValueFormatted
                }
                return objElements[i]
              }()
            }
          )
	}
  // rearange some elements
  const firstItem = displayContent.splice( 2, 1 )
  const secondItem = displayContent.splice( -1 )
  const cItem = displayContent.concat( firstItem, secondItem )
	return cItem.reverse()
}
module.exports = Format
