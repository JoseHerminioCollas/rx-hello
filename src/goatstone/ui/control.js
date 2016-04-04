/* goatstone.ui.control */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject
const StartStop = require( 'goatstone/ui/start-stop' )
const CitySelect = require( 'goatstone/ui/city-select' )

module.exports = React.createClass( {
	getInitialState: function(){
		return {
      opacity: 0.0
		}
	},
	componentWillMount: function(){
		this.props.appStream
      .filter( x => x.type === 'onLoad' && x.name === 'weather' )
      .subscribe( x => {
          this.setState( { 'city': x.data, opacity: 1.0  } )
      }, err=>{throw err}, ()=>{console.log('cmplt')})
	},
	render: function() {
		const CSS = this.props.style
		return 	<div
							style={ { ...CSS.container, opacity: this.state.opacity } } >

							<StartStop
								style={ CSS.start }
								appStream={ this.props.appStream }
								controlStream={ this.props.controlStream } />
							<CitySelect
								cityData={ this.props.cityData }
								style={ CSS.citySelect }
								appStream={ this.props.appStream }
								controlStream={ this.props.controlStream } />

						</div>
	}
} )
