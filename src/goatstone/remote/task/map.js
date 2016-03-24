/* goatstone.remote.task.map */
'use strict'
var config = require( 'goatstone/config' )
var GoogleMapsLoader = require('google-maps'); // only for common js environments 
GoogleMapsLoader.KEY = config.gMapKey  
GoogleMapsLoader.load(function(google) {
	const el = document.querySelector('#map')
	new google.maps.Map( el,  {
          center: {lat: 51.51, lng: -0.13 },
          zoom: 8
        } ) 
})
const gm = {
	key: config.gMapKey,
	center:  {lat: 51.51, lng: -0.13 },
	zoon: 8,
	el: document.querySelector('#map'),
	getMap: x => {
		const el = document.querySelector('#map')
		new google.maps.Map( gm.el,  
		{
			center: {lat: x.center.lat, lng: x.center.lng },
			zoom: 8
    	} ) 
	}

}
module.exports = gm