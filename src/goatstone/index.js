/* goatstone.index   */
'use strict'
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
//const FuncSubject = require('rx-react').FuncSubject
//const oCBacks = require('goatstone/util/o-call-backs')
const Cloud = require('goatstone/remote/cloud')
const cloud = new Cloud({owKey: 'abc'})
require( 'babel-polyfill' )
const cityGen = require( 'goatstone/generator/city' )
const Ticker = require( 'goatstone/time/ticker' )
const ticker = new Ticker( )
var cityI = cityGen( cloud.city() )
// streams
const appStream = require( 'goatstone/stream/application' )
const controlStream = require( 'goatstone/stream/control' )( appStream, cloud, ticker )
// ui
const Control = require( 'goatstone/ui/control' )( controlStream, appStream, cloud.city() )
const Message = require( 'goatstone/ui/message-display' )( appStream )
const WeatherDisplay = require( 'goatstone/ui/weather-display' )( appStream )

ticker.onTick( x => {
		const genV = cityI.next()
		if( genV.done ){ //stop ticker
			ticker.stop()
			cityI = cityGen( cloud.city() ) // reset the generator
			appStream.onNext( { type: 'stateChange', name: 'stopped' } )
			return
		}
		const dataP = {
			type: 'getData',
			name: 'weather',
			data: { city: genV.value }
		}
		controlStream.onNext( dataP )
	}
)

window.onload = function() {
	ReactDOM.render( <WeatherDisplay />, 
		document.getElementById( 'weather-display' ) ) 
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

	controlStream.onNext(
	{
		type:'getData',
		name: 'weather',
		data: { city: cityI.next().value }
	}
	)
	appStream.onNext({
			type: 'stateChange',
			name: 'loaded'
		}
	)
	// direct DOM manipulation to achieve the fade in effect for Google Maps
	document.querySelector( '#map' ).style.opacity = 1.0
}
