/* goatstone.index   */
'strict mode'   
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const appStream = FuncSubject.create()
const controlStream = require( 'goatstone/stream/control' )( appStream )
const Control = require( 'goatstone/ui/control' )( controlStream ) 
const Message = require( 'goatstone/ui/message' )( appStream )
require( 'babel-polyfill' ) 

window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

}
