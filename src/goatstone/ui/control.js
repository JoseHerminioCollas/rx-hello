/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )
//eventFactory.get( type, name, data) TODO
const FuncSubject = require('rx-react').FuncSubject 

module.exports = function( controlStream ){

	const Weather = require( 'goatstone/ui/weather' )( controlStream ) 
	
	var Start = React.createClass({
		getInitialState: function(){
			return { value: 'start' }
		},
		componentWillMount: function(){
			this.startButton = FuncSubject.create(function(e){
				return e.target.value
			})
			this.startButton.subscribe( x => { 
				controlStream.onNext( { 
					type:'control', 
					name: 'start', 
					data: { speed:1000 }
				} )
			}, err => err, () => { return 'complete' } ) 
		},
	 	render:  function() { 
	 		return <button onClick={ this.startButton } name="start" value="1">Start</button>
	 	}
	 })  
	var Stop = React.createClass({
		componentWillMount: function(){
			const THIS = this
			this.stopButton = controlStream
			this.stopButton.subscribe( x => {
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
