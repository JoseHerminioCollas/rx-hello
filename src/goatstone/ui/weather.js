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
	 		return	<div>
	 					<button onClick={ this.buttonA }> Get Weather </button>
	 					    {this.state.b} { stateA }  
	 				</div>  
	 	}
	 })

	return Weather
}

