/* goatstone.index */
'strict mode'   
const Rx = require( 'rx' )
const async = require( "async" )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const Message = require( 'goatstone/ui/message' )
const tasks = require( 'goatstone/remote/task/tasks' )
const FuncSubject = require('rx-react').FuncSubject;
require( 'babel-polyfill' ) 

var message // TODO set this as an Observable

/* appSubject   
	handles application componet gererated events
*/
const appSubject = FuncSubject.create()
const source = appSubject
source.subscribe( createObserver( 'SourceA' ) ) 
source.subscribe( createObserver( 'SourceB' ) ) 
function createObserver( tag ) {
    return Rx.Observer.create(
        function ( x ) {
            console.log('T: ' + tag )    
            console.log('x: ' + x )    
			message.setState( { x: ` getting  results: ${tag} ${x}  ` } )
			async.parallel( tasks.map( e => { 
				return e.task 
			} ), ( err, results ) => {
				message.setState( { x: JSON.stringify ( results ) } )
	 		} )
        },
        function ( err ) {
            console.log('Error: ' + err)    
        },
        function () {
            console.log('Completed')    
        }) 
}
// Control
const controlSubject = FuncSubject.create()
const controlSubjectSource = controlSubject
controlSubjectSource.subscribe( controlObserver( 'SourceAA' ) ) 
controlSubjectSource.subscribe( controlObserver( 'SourceBB' ) ) 
function controlObserver( tag ) {
    return Rx.Observer.create(
        function ( x ) {
            console.log('TTTT: ' + tag )    
            console.log( x )            	
			message.setState( { x: ` getting  results: ${ tag } ${ x.pageX }  ${ new Date() } ` } )
        },
        function ( err ) {
            console.log('Error: ' + err)    
        },
        function () {
            console.log('Completed')    
        }) 
}
// call the ui compoent modules
const Control = require( 'goatstone/ui/control' )( controlSubject ) 
const Weather = require( 'goatstone/ui/weather' )( appSubject ) 

window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	message = ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 
	ReactDOM.render( <Weather />, 
		document.getElementById( 'weather' ) ) 
}
