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
const Message = require( 'goatstone/ui/message' )( appStream )

require( 'babel-polyfill' ) 

window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

	appStream.onNext( {
		type: 'content',
		name: 'intro',
		data: [
			{ label:'Welcome', value:'RxHello'}
		]
	} )

	console.log( 111 )
}
/*  
Event Interface 
{ type, name, data }

Usage
aStream.onNext ( EvnentObj.get( 'content', 'intro', data ) )

*/