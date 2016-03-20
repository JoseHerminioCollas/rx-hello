/* goatstone.ui.Message  */
const React = require( 'react' )
var StateStreamMixin = require('rx-react').StateStreamMixin;
const Rx = require( 'rx' ) 

module.exports = function( appStream ){

	var Message = React.createClass({
		mixins: [ StateStreamMixin ],
		getStateStream: function () {
			return appStream
			.filter( function( evnt ){ 
				return evnt.type === 'content'
			} )
			.map( function ( content ) {
			    return {
					messageArr: content.data
			     } 
		    } ) 
		},		
		getInitialState: function() {
		    return { message: 'init message', title: 'init title', messageArr: []} 
			},
	 	render:  function() {
	    	var secondsElapsed = this.state ? this.state.secondsElapsed : 0;			
	 		const items = this.state.messageArr.map( function( e, i ){
	 			return <div key={ i }>
	 				{ e.label }   
	 				<em> { e.value } </em> 
	 			</div>
	 		})
	 		return <div> {this.state.a} { items } </div>
	 	}
	 })  
	return Message
}