/* goatstone.index   */
'use strict'
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const oCBacks = require('goatstone/util/o-call-backs')
const Cloud = require('goatstone/remote/cloud')
const cloud = new Cloud({owKey: 'abc'})

// streams
const appStream = FuncSubject.create()
const controlStream = require( 'goatstone/stream/control' )( appStream, cloud )
// ui
const Control = require( 'goatstone/ui/control' )( controlStream, cloud.city() ) 
const Message = require( 'goatstone/ui/message-display' )( appStream )
const WeatherDisplay = require( 'goatstone/ui/weather-display' )( appStream )

require( 'babel-polyfill' ) 

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
		data: { city: 'London' } // TODO set this on the UI 
	}
	)
	appStream.onNext( {
		type: 'message',
		name: 'intro',
		data:  
			{ title:'RxHello', message:'Welcome to RxHello' }		 
	} )
}
