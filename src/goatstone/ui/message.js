/* goatstone.ui.message  */
const React = require( 'react' )

var Message = React.createClass({
	getInitialState: function() {
	    return {x: 'message'};
		},
 	render:  function() { 
 		return <div>[  {this.state.x} ]</div>
 	}
 })  

module.exports = Message