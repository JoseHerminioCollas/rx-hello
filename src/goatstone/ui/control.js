/* goatstone.ui.control */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject

module.exports = function( controlStream, cityData ){

	return React.createClass( {
		getInitialState: function(){
			return { 
				city: 'london',
				start: {
					isDisabled: false 
				},
				stop: {
					isDisabled: true
				}
			}
		},
		componentWillMount: function(){

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

			this.cities = React.createElement( 'select', {
					'defaultValue': this.state.city,
					'data-type': 'getData',
					'data-name': 'weather',
					onChange: x => this.changeHandler
				},
				...cityData.map( ( e ) => {
						return React.createElement( "option", { value: e[1] }, e[0] )
					} )
				)

			this.StartHandler = FuncSubject.create( () => {
				return {
					name: 'start',
					type: 'control'
				}
			} )
			this.StartHandler.subscribe( x => {
				this.setState( { start: { isDisabled: true } } )
				this.setState( { stop: { isDisabled: false } } )
				controlStream.onNext( x )
			}, err=>{throw err}, ()=>console.log('complete') )

			this.StopHandler = FuncSubject.create( () => {
				return {
					name: 'stop',
					type: 'control'
				}
			} )
			this.StopHandler.subscribe( x => {
				this.setState( { stop: { isDisabled: true } } )
				this.setState( { start: { isDisabled: false } } )
				controlStream.onNext( x )
			}, err=>{throw err}, ()=>console.log('complete') )

			this.Start = React.createFactory('button')
			this.Stop = React.createFactory('button' )
		},
		render: function() {
			return 	<div
						onChange={ this.changeHandler } >
						{ this.state.city }
						{ this.cities }
						{
							this.Start( {
								disabled: this.state.start.isDisabled,
								onClick: this.StartHandler
							},
								'Start' )
						}
						{
							this.Stop( {
								disabled: this.state.stop.isDisabled,
								onClick: this.StopHandler
							},
								'Stop' )
						}
					</div>
		} 
	})  
}
