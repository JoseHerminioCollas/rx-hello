/* goatstone.ui.control */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject

module.exports = function( controlStream, appStream, cityData  ){

	return React.createClass( {
		getInitialState: function(){
			return {
				city: 'london',
				start: {
					isDisabled: false
				},
				stop: {
					isDisabled: true
				},
                opacity: 0.0
			}
		},
		componentWillMount: function(){

			appStream
                .filter( x => x.type === 'onLoad' && x.name === 'weather' )
                .subscribe( x => {
                    this.setState( { 'city': x.data, opacity: 1.0  } )
                }, err=>{throw err}, ()=>{console.log('cmplt')})

			appStream
                .filter( x =>  x.type === 'stateChange' && x.name === 'stopped' )
                .subscribe( () => {
                    this.setState( {
                        start : { isDisabled: false },
                        stop : { isDisabled: true }
                    } )
                    this.setState( { stop : { isDisabled: true } } )
                }, err=>{throw err}, ()=>{console.log('cmplt')})

			this.ChangeHandler = FuncSubject.create( x => {
				const cityValue = x.target.value
				this.setState( {city: cityValue } )
				controlStream.onNext( { type:'control', name: 'stop' } )
				return {
					type: 'getData',
					name: 'weather',
					data: { city: cityValue }
				}
			})
			this.ChangeHandler.subscribe( x =>{
				controlStream.onNext( {
						type:'getData',
						name:'twitter',
						data: { city: x.data.city }
					} )
					controlStream.onNext( x )
			}, err => {throw err}, () => { return 'complete' } )

			this.City = React.createFactory( 'select' )

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

			const CSS = this.props.style

			return 	<div style={
				{ ...CSS.container, opacity: this.state.opacity }
			} >

				{this.City(
					{
						'value': this.state.city,
						onChange: this.ChangeHandler,
						style: CSS.citySelect
					},
					...cityData.map( ( e ) => {
						return React.createElement( "option", { value: e[1] }, e[0] )
					} )

				)}
				{
					this.Start( {
						disabled: this.state.start.isDisabled,
						onClick: this.StartHandler,
						style: CSS.start
					},
						'Start' )
				}
				{
					this.Stop( {
						disabled: this.state.stop.isDisabled,
						onClick: this.StopHandler,
						style: CSS.stop
					},
						'Stop' )
				}
					</div>
		}
	})
}
