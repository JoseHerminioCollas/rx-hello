/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )

module.exports = function( appSubject ){

	const Weather = require( 'goatstone/ui/weather' )( appSubject ) 
	
	var Start = React.createClass({
		v: 22,
		getInitialState: function(){
			return { value: 'start' }
		},
		componentWillMount: function(){
			const THIS = this
			this.startButton = appSubject
			this.startButton.subscribe( x => {
				//console.log('start') 	
			}, err => err, () => { return 'complete' } ) 
		},
	 	render:  function() { 
	 		return <button onClick={ this.startButton } name="start" value="1">Start</button>
	 	}
	 })  
	var Stop = React.createClass({
		componentWillMount: function(){
			const THIS = this
			this.stopButton = appSubject
			this.stopButton.subscribe( x => {
				//console.log('stop', this, x) 
			})
		},
	 	render: function() { 
	 		return <button onClick={ this.stopButton } name="stop" value="100">Stop</button>  
	 	}
	 })
	var Control = React.createClass( { 
		render: function() { 
			return <div> 
						<Stop /> <Start /> <Weather />
					</div>
		} 
	})  
	return Control
}
