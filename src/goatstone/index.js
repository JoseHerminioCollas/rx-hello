'strict mode'   
const Rx = require( 'rx' )
const async = require( "async" )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const Message = require( 'goatstone/ui/message' )
const Control = require( 'goatstone/ui/control' )
const tasks = require( 'goatstone/remote/task/tasks' )
var FuncSubject = require('rx-react').FuncSubject;
require( 'babel-polyfill' ) 

var startButton, pauseButton, message, wb

/* appSubject  
	handles application componet gererated events
*/
const appSubject = FuncSubject.create()
const source = appSubject
source.subscribe( createObserver( 'SourceA' ) ) 
source.subscribe( createObserver( 'SourceB' ) ) 
const interval = Rx.Observable.interval( 1000 ).take( 2 )
function createObserver( tag ) {
    return Rx.Observer.create(
        function ( x ) {
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

var Weather = require( 'goatstone/ui/weather' )( appSubject) 

window.onload = function() {

	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	message = ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

	ReactDOM.render( <Weather />, 
		document.getElementById( 'w' ) ) 

	startButton = document.getElementById('start') 
	pauseButton = document.getElementById('stop') 
	wb = document.getElementById( 'w' )
	//onDocReady()
}
/*
function onDocReady(){
 	 
	const starts = Rx.Observable.fromEvent(startButton, 'click' ) 
	const stops = Rx.Observable.fromEvent(pauseButton, 'click' ) 
	const onOff = Rx.Observable.merge(
		starts.map( (event) => { return true; }),
	    stops.map( (event) => { return false; })
	).startWith( false ) 
	const ticks = Rx.Observable.timer( 0, 1000 ).pausable(
		onOff
	).subscribe(
	   ( x ) => {
		message.setState({a:false, x: x})
	  },
	  ( err ) => {
		message.setState({  x: err })
	  },
	  () => {
		message.setState({  x: 'Completed' })
	  }
	)   
}
*/