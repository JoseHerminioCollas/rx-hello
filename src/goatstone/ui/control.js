/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject 
const cs = [
['New York', 'new-york'],
['Seattle', 'seattle'],
['Los Angeles', 'los-angeles'],
['London', 'london' ],
]
const csM = cs.map( ( e, i ) => {
	return React.createElement("option", 
	{ 
		value: e[1]
	}, 
	e[0])  
})
module.exports = function( controlStream ){

	var city = 'london'
	const cities = React.createElement( 
		'select', 
		{ 
			'defaultValue': city,
			'data-type': 'getData', 
			'data-name': 'weather' 
		}, 
		...csM
		) 
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
			this.changeHandler = function( x ){
				city = x.target.value
			}  
			this.clickHandler = FuncSubject.create( function(e){
				// TODO call a seperate function, choke events
				return { 
					type: e.target.dataset.type, 
					name: e.target.dataset.name, 
					data: { city }
				}
			})
			this.clickHandler.subscribe( x => {				
				controlStream.onNext( x )
			}, err => err, () => { return 'complete' } )
		},
		render: function() {
			return 	<div 
						onClick={ this.clickHandler } 
						onChange={ this.changeHandler }>
						{ cities }						
						   { start } { stop } 
					</div>
		} 
	})  
	return Control
}
