/* goatstone.ui.control */
'strict mode'   
const React = require( 'react' )
const Rx = require('rx')
const FuncSubject = require('rx-react').FuncSubject 

module.exports = function( controlStream, cityData ){

	return React.createClass( {
		getInitialState: function(){
			return { city: 'london' }
		},
		componentWillMount: function(){
			// button handler
			this.buttonHandler = FuncSubject.create( x => {
				return {
					name: x.target.dataset.name,
					type: x.target.dataset.type
				}
			})
			this.buttonHandler.subscribe( x => {
				controlStream.onNext( x )
			}, err => {throw err}, () => { return 'complete' } )
			// change handler
			this.changeHandler = FuncSubject.create( x => {
				const cityValue = x.target.value
				this.setState( {city: cityValue } )
				return {
					name: x.target.dataset.name,
					type: x.target.dataset.type,
					data: { city: cityValue }
				}
			})
			this.changeHandler.subscribe( x =>{
				controlStream.onNext( x )
			}, err => {throw err}, () => { return 'complete' } )
			// UI elements
			this.start = React.createElement( 'button', {
					'data-type': 'control',
					'data-name': 'start',
					onClick: this.buttonHandler
				}, 'Start' )
			this.stop = React.createElement( 'button', {
					'data-type': 'control',
					'data-name': 'stop',
					onClick: this.buttonHandler
				}, 'Stop')
			this.cities = React.createElement( 'select', {
					'defaultValue': this.state.city,
					'data-type': 'getData',
					'data-name': 'weather',
					onChange: x => this.changeHandler
				},
				...cityData.map( ( e, i ) => {
						return React.createElement( "option", { value: e[1] }, e[0] )
					} )
				)
		},
		render: function() {
			return 	<div 
						onClick={ this.clickHandler }
						onChange={ this.changeHandler }> 
						{ this.cities } { this.start } { this.stop }
					</div>
		} 
	})  
}
