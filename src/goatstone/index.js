'strict mode'
const Rx = require( 'rx' )
const async = require( "async" )
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

	const el = document.createElement( 'button' )
	el.id = 'start'
	el.appendChild(document.createTextNode('start'))

	const el1 = document.createElement( 'button' )
	el1.id = 'pause'
	el1.appendChild(document.createTextNode('pause'))

	const el2 = document.createElement( 'button' )
	el2.id = 'weather'
	el2.appendChild(document.createTextNode('weather'))

	m = document.createElement( 'div' )
	m.id = 'm'
	m.appendChild(document.createTextNode('m'))

	document.body.appendChild( el )
	document.body.appendChild( el1 )
	document.body.appendChild( el2 )
	document.body.appendChild( m )
 
	startButton = document.getElementById('start') 
	pauseButton = document.getElementById('pause') 
	wb = document.getElementById( 'weather' )
	onDocReady()
}


