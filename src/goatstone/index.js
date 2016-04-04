/* goatstone.index   */
'use strict'
require( 'babel-polyfill' )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )
const Cloud = require('goatstone/remote/cloud')
const Ticker = require( 'goatstone/time/ticker' )

const cloud = new Cloud()
const ticker = new Ticker( )
var cityI = require( 'goatstone/generator/inter-index' )( cloud.city() )
// streams
const appStream = require( 'goatstone/stream/application' )
const controlStream = require( 'goatstone/stream/control' )( appStream, cloud, ticker )
// ui
const appStyle = require( 'goatstone/ui/style/main' )
const Control = require( 'goatstone/ui/control' )( controlStream, appStream, cloud.city() )
const Message = require( 'goatstone/ui/message-display' )( appStream )
const WeatherDisplay = require( 'goatstone/ui/weather-display' )( appStream )
const TwitterDisplay = require( 'goatstone/ui/twitter-display' )( appStream )
const TitleHeader = require( 'goatstone/ui/title-header' )( appStream )

ticker.onTick( x => {
		const genV = cityI.next()
		if( genV.done ){ //stop ticker
			ticker.stop()
			cityI = require( 'goatstone/generator/inter-index' )( cloud.city() ) // reset the generator
			appStream.onNext( { type: 'stateChange', name: 'stopped' } )
			return
		}
		controlStream.onNext( {
			type: 'getData',
			name: 'weather',
			data: { city: genV.value }
		} )
		controlStream.onNext( {
				type:'getData',
				name:'twitter',
				data: { city: genV.value }
			} )
	}
)

window.onload = function() {
	ReactDOM.render( <TwitterDisplay
		style={ appStyle.twitterDisplay } />,
		document.getElementById( 'twitter-display' ) )
	ReactDOM.render(
		<WeatherDisplay
		title={ 'OpenWeatherMap.org Feed' }
		style={ appStyle.weatherDisplay } />,
		document.getElementById( 'weather-display' ) )
	ReactDOM.render( <Control
		style={ appStyle.control }  />,
		document.getElementById( 'control' ) )
	ReactDOM.render( <Message
		style={ appStyle.messageDisplay } />,
		document.getElementById( 'message' ) )
	ReactDOM.render( <TitleHeader
		style={ appStyle.titleHeader }  />,
		document.getElementById( 'title-header' )
	)
	const initCity = cityI.next().value
	controlStream.onNext(
		{
			type:'getData',
			name:'twitter',
			data: { city: initCity }
		}
	)
	controlStream.onNext(
	{
		type:'getData',
		name: 'weather',
		data: { city: initCity }
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
