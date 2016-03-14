'strict mode'   
const Rx = require( 'rx' )
const async = require( "async" )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
require( 'babel-polyfill' ) 

const tasks = require( 'goatstone/remote/task/tasks' )
var startButton, pauseButton, message, wb

function onComplete( err, results ){
	message.setState({a:false, x: JSON.stringify ( results )})
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
window.onload = function() {
	var Message = React.createClass({
		getInitialState: function() {
		    return {x: 'message'};
  		},
	 	render:  function() { 
	 		return <div>[  {this.state.x} ]</div>
	 	}
	 })  
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
		hC: function(){
			this.setState( {a:  false, x: 'abc'})
		},
		getInitialState: function() {
		    return {a: true};
  		},
	 	render: function() { 
	 		const tpd = (this.state.a) ? 'a' : 'b'
	 		return <button onClick={this.hC}>weather{this.state.x} { tpd }</button>  
	 	}
	 })
	ReactDOM.render( <Stop />, 
		document.getElementById( 'stop' ) ) 
	ReactDOM.render( <Start />, 
		document.getElementById( 'start' ) ) 
	ReactDOM.render( <Weather data={1} />, 
		document.getElementById( 'w' ) )
	message = ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

	startButton = document.getElementById('start') 
	pauseButton = document.getElementById('stop') 
	wb = document.getElementById( 'w' )
	onDocReady()
}
