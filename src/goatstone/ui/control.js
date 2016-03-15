/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )

module.exports = function( appSubject ){

	var Start = React.createClass({
		componentWillMount: function(){
			const THIS = this
			this.startButton = appSubject
			this.startButton.subscribe( x => console.log('start'))
		},
	 	render:  function() { 
	 		return <button onClick={ this.startButton }>Start</button>
	 	}
	 })  
	var Stop = React.createClass({
		componentWillMount: function(){
			const THIS = this
			this.stopButton = appSubject
			this.stopButton.subscribe( x => console.log('stop', this, x) )
		},
	 	render: function() { 
	 		return <button onClick={ this.stopButton }>Stop</button>  
	 	}
	 })
	var Control = React.createClass( { 
		render: function() { 
			return <div> 2
						<Stop /> <Start /> 
					</div>
		} 
	})  
	return Control
}
