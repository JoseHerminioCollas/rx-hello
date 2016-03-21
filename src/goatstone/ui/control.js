/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject 

module.exports = function( controlStream ){

	const weather = React.createElement( 'button', { 
		'data-type': 'getData', 
		'data-name': 'weather' 
	}, 'Weather' ) 
	const start = React.createElement( 'button', { 
		'data-type': 'control', 
		'data-name': 'start' 
	}, 'Start' ) 
	const stop = React.createElement( 'button', { 
		'data-type': 'control', 
		'data-name': 'stop' 
	}, 'Stop' ) 

	var Control = React.createClass( { 
		componentWillMount: function(){
			this.clickHandler = FuncSubject.create( function(e){
				return { type: e.target.dataset.type, name: e.target.dataset.name }
			})
			this.clickHandler.subscribe( x => {
				controlStream.onNext( {
					type: x.type,
					name: x.name
				} )
			}, err => err, () => { return 'complete' } )
		},
		render: function() {
			return 	<div onClick={ this.clickHandler }>
						{ weather } { start } { stop } 
					</div>
		} 
	})  
	return Control
}
