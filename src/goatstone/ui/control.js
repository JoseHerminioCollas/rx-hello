/* goatstone.ui.control */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject
const StartStop = require( 'goatstone/ui/start-stop' )

module.exports = function( controlStream, appStream, cityData  ){

	return React.createClass( {
		getInitialState: function(){
			return {
				city: 'london',
        opacity: 0.0
			}
		},
		componentWillMount: function(){

			appStream
	      .filter( x => x.type === 'onLoad' && x.name === 'weather' )
	      .subscribe( x => {
	          this.setState( { 'city': x.data, opacity: 1.0  } )
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

		},
		render: function() {

			const CSS = this.props.style

			return 	<div style={
				{ ...CSS.container, opacity: this.state.opacity } } >
				<StartStop style={ CSS.start } appStream={ appStream } controlStream={ controlStream }/>

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
					</div>
		}
	})
}
