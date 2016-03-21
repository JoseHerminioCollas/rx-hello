/* goatstone.ui.MessageDisplay  */
const React = require( 'react' )
var StateStreamMixin = require('rx-react').StateStreamMixin;
const Rx = require( 'rx' ) 

module.exports = function( appStream ){

	return React.createClass({
		mixins: [ StateStreamMixin ],
		getStateStream: function () {
			return appStream
			.filter( function( evnt ){ 
				return evnt.type === 'message'
			} )
			.map( function ( x ) {
			    return {
					message: x.data.message,
					title: x.data.title
			     } 
		    } ) 
		},		
		getInitialState: function() {
		    return { 
		    	message: 'init message', 
			    title: 'Goatstone'
			} 
		},
	 	render:  function() {
	 		return 	<div>
	 					<h3>{ this.state.title }</h3>
	 		 			{ this.state.message } 
			 		</div>
	 	}
	 } )  
}
