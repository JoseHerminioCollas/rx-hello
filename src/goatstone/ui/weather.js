/*  goatstone.ui.weather 
	@param {function} Obervable Subject 
*/
'use strict'
const Rx = require( 'rx' )
const React = require( 'react' )

module.exports =  function( appSubject ){

	var Weather = React.createClass( {
		componentWillMount: function(){
			const THIS = this
			this.buttonA = appSubject
			this.buttonA.subscribe( function ( e ){
				THIS.setState( { a: false, b: 'clicked!' } )
			} )
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

