/* goatstone.index   */
'strict mode'   
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const oCBacks = require('goatstone/util/o-call-backs')
// streams
const appStream = FuncSubject.create()
const controlStream = require( 'goatstone/stream/control' )( appStream )
// ui
const Control = require( 'goatstone/ui/control' )( controlStream ) 
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

	controlStream.onNext( { type: 'display', name: 'intro', data:'hello' } )

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
/*  
Event Interface 
{ type, name, data }

Usage
aStream.onNext ( EvnentObj.get( 'content', 'intro', data ) )

*/