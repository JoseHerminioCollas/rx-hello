/** The entrance point for the application
 * @module goatstone/index
*/
'use strict'
require( 'babel-polyfill' )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const Cloud = require('goatstone/remote/cloud')
const Ticker = require( 'goatstone/time/ticker' )
const StreamEvent = require( 'goatstone/stream/event' )

const streamEvent = new StreamEvent()
const cloud = new Cloud()
const ticker = new Ticker( )
var cityIter = require( 'goatstone/generator/inter-index' )( cloud.city() )
// streams
const appStream = require( 'goatstone/stream/application' )
const controlStream = require( 'goatstone/stream/control' )( appStream, cloud, ticker, streamEvent )
// ui
const appStyle = require( 'goatstone/ui/style/main' )
const Control = require( 'goatstone/ui/control' )
const Message = require( 'goatstone/ui/message-display' )
const WeatherDisplay = require( 'goatstone/ui/weather-display' )
const TwitterDisplay = require( 'goatstone/ui/twitter-display' )
const TitleHeader = require( 'goatstone/ui/title-header' )
const initCity = cityIter.next().value

window.onload = function() {

	ReactDOM.render( <TwitterDisplay
		appStream={ appStream }
		style={ appStyle.twitterDisplay } />,
		document.getElementById( 'twitter-display' ) )
	ReactDOM.render(
		<WeatherDisplay
		appStream={ appStream }
		title={ 'OpenWeatherMap.org Feed' }
		style={ appStyle.weatherDisplay } />,
		document.getElementById( 'weather-display' ) )
	ReactDOM.render( <Control
		style={ appStyle.control }
		appStream={ appStream }
		controlStream={ controlStream }
		streamEvent={ streamEvent }
		cityData={ cloud.city() }	/>,
		document.getElementById( 'control' ) )
	ReactDOM.render( <Message
		appStream={ appStream }
		style={ appStyle.messageDisplay } />,
		document.getElementById( 'message' ) )
	ReactDOM.render( <TitleHeader
		appStream={ appStream }
		style={ appStyle.titleHeader }  />,
		document.getElementById( 'title-header' )
	)

	controlStream.onNext(
		streamEvent.create('getData', 'twitter', { city: initCity } )
	)
	controlStream.onNext(
		streamEvent.create('getData', 'weather', { city: initCity } )
	)
	appStream.onNext(
		streamEvent.create('stateChange', 'loaded' )
 	)

	// direct DOM manipulation to achieve the fade in effect for Google Maps
	document.querySelector( '#map' ).style.opacity = 1.0

	ticker.onTick( x => {
			const genV = cityIter.next()
			if( genV.done ){ //stop ticker
				ticker.stop()
				cityIter = require( 'goatstone/generator/inter-index' )( cloud.city() ) // reset the generator
				appStream.onNext( streamEvent.create( 'stateChange', 'stopped' ) )
				return
			}
			controlStream.onNext(
				streamEvent.create('getData', 'weather', { city: genV.value } )
 			)
			controlStream.onNext(
				streamEvent.create('getData', 'twitter', { city: genV.value } )
			)
		}
	)

}
