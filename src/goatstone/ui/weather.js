/*  goatstone.ui.weather 
	@param {function} Obervable Subject 
*/
'use strict'
const Rx = require( 'rx' )
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject 

module.exports =  function( controlStream ){

	var Weather = React.createClass( {
		componentWillMount: function(){
			this.buttonA = FuncSubject.create( ( e ) => {
				return e.target.value
			})
			this.buttonA.subscribe( x => { 
				controlStream.onNext( { 
					type: 'getData', 
					name: 'weather', 
					data: { speed:1000 }
				} )
			}, err => err, () => { return 'complete' } ) 
		},
		getInitialState: function() {
		    return {a: true, b: 'b state val'};
			},
	 	render: function() { 
	 		var stateA = (this.state.a) ? 'T' : 'F'
	 		return	<button onClick={ this.buttonA } name="weather" value="1"> Get Weather </button>  
	 				 
	 	}
	 })

	return Weather
}

