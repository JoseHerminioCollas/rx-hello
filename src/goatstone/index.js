'strict mode'   
const Rx = require( 'rx' )
const async = require( "async" )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
require( 'babel-polyfill' ) 

const tasks = require( 'goatstone/remote/task/tasks' )
var startButton, pauseButton, wb, m

function onComplete( err, results ){
	m.innerHTML = JSON.stringify ( results )
}

function onDocReady(){

	const starts = Rx.Observable.fromEvent(startButton, 'click' ) 
	const stops = Rx.Observable.fromEvent(pauseButton, 'click' ) 
	const weather = Rx.Observable.fromEvent( wb, 'click' )
	
	// TODO select a city

    weather.subscribe( ( e ) => {
		async.parallel( tasks.map( e => { 
			return e.task 
		} ), onComplete )
    }) 

	const onOff = Rx.Observable.merge(
		starts.map( (event) => { return true; }),
	    stops.map( (event) => { return false; })
	).startWith( false ) 

	const ticks = Rx.Observable.timer( 0, 1000 ).pausable(
		onOff
	).subscribe(
	   (x) => {
		m.innerHTML = 'Next:: ' + x
	  },
	  (err) => {
		m.innerHTML = 'Error: ' + err
	  },
	  () => {
		m.innerHTML = 'Completed'
	  }
	);

	async.parallel( tasks.map( e => { 
		return e.task 
	} ), onComplete )
  
}
window.onload = function() {
	m = document.getElementById( 'm' )
	var Start = React.createClass({
	 	render:  () => { 
	 		return <button>Start</button>
	 	}
	 })  
	var Stop = React.createClass({
	 	render: () => { 
	 		return <button>Stop</button>  
	 	}
	 })
	var Weather = React.createClass({
	 	render: () => { 
	 		return <button>weather</button>  
	 	}
	 })
	ReactDOM.render( <Stop />, document.getElementById( 'stop' ) ) 
	ReactDOM.render( <Start />, document.getElementById( 'start' ) ) 
	ReactDOM.render( <Weather />, document.getElementById( 'w' ) )

	startButton = document.getElementById('start') 
	pauseButton = document.getElementById('stop') 
	wb = document.getElementById( 'w' )
	onDocReady()
}


