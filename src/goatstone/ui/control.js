/* goatstone/ui/control */
const React = require( 'react' )

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

var Control = React.createClass( { 
	render:  () => { 
		return <div> 
			<Stop /> <Start /><Weather data={1} />
		</div>
	} 
})  

module.exports = Control