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
        style: {
            fontSize: '1.2em',
            transition: 'opacity 9s',
            borderRadius: '13px',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '12px'
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
			return 	<div style={ { opacity: this.state.opacity, ...this.style } } >

				{this.City(
					{
						'value': this.state.city,
						onChange: this.ChangeHandler
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
