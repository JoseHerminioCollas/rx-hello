/* goatstone.text.format */
'use strict'
var traverse = require('traverse');

// display these items with labels goatstone.text.label.openWeather
var labels = {
    '0,name': 'Name',
    '0,weather,0,description': 'Weather',
	'0,coord,lon': 'Longitude',
	'0,coord,lat': 'Latitude',
	'0,weather,0,main': 'Weather',
	'0,weather,0,description': 'Weather Description',
	'0,main,temp': 'Temerature',
	'0,main,pressure': 'Pressure',
	'0,main,humidity': 'Humidity',
	'0,main,temp_min': 'Minimum Temperature',
	'0,main,temp_max': 'Maximum Temperature',
	'0,wind,speed': 'Wind Speed',
	'0,wind,gust': 'Wind Gusts',
	'0,sys,country': 'Country',
	'0,sys,sunrise': 'Sun Rise',
	'0,sys,sunset': 'Sun Set' 
}
function Format(){
	this.a = 1
}
Format.prototype.JSONtoHTML = function ( jsonObj ){
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
	return displayContent
}
module.exports = Format