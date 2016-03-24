/* goatstone.ui.control */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject
var StateStreamMixin = require('rx-react').StateStreamMixin;

module.exports = function( controlStream, appStream, cityData ){

	return React.createClass( {
		mixins: [ StateStreamMixin ],
		getStateStream: function () {
			return appStream
				.filter( function( evnt ){
					return evnt.type === 'onLoad' && evnt.name === 'weather'
				} )
				.map( function ( x ) {
					console.log('xxxxx', x)
					return {
						city: x.data   //x.data.message.value
					}
				} )
		},
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
					name: 'getData',
					type: 'weather',
					data: { city: cityValue }
				}
			})
			this.changeHandler.subscribe( x =>{
				controlStream.onNext( x )
			}, err => {throw err}, () => { return 'complete' } )

			this.C = React.createFactory( 'select' )
			this.cities = React.createElement( 'select', {
					'defaultValue': this.state.city,
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
			return 	<div>

				{this.C(
					{
						'value': this.state.city,
						onChange: this.changeHandler
					},
					...cityData.map( ( e ) => {
						return React.createElement( "option", { value: e[1] }, e[0] )
					} )

				)}
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
