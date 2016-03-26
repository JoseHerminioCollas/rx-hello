/* goatstone.text.format */
'use strict'
var traverse = require('traverse');

// display these items with labels  
var labels = {
    'name': 'City Name',
    'clouds,all': 'Weather',
	'coord,lon': 'Longitude',
	'coord,lat': 'Latitude',
	'weather,0,main': 'Weather',
	'weather,0,description': 'Weather Description',
	'main,temp': 'Temerature',
	'main,pressure': 'Pressure',
	'main,humidity': 'Humidity',
	'main,temp_min': 'Minimum Temperature',
	'main,temp_max': 'Maximum Temperature',
	'wind,speed': 'Wind Speed',
	'wind,gust': 'Wind Gusts',
	'wind,deg': 'Wind Degree',
	'sys,country': 'Country',
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
	var displayContent = []
	for (var i in objElements) {
	    if (labels[i])
	        displayContent.push({label: labels[i], value: objElements[i]})
	}
	return displayContent.reverse()
}
module.exports = Format