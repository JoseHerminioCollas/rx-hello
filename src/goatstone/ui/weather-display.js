/** Display information about the weather
 * @module goatstone/ui/weather-display/WeatherDisplay  
 */
'use strict'
const React = require( 'react' )

module.exports = React.createClass({
	componentWillMount: function(){

		this.props.appStream//.filter( x => x.type === 'content' )
		.filter( x => x.type === 'stateChange' && x.name === 'weatherLoaded' )
		.subscribe( x => {
			this.setState( { messageArr: x.data.contentList, opacity: 1.0 } )
		},err => { throw err }, () => console.log('cmplt') )

	},
	getInitialState: function() {
	    return {
			messageArr: [],
			opacity: 0.0
		}
	},
		render: function() {
			const S = this.props.style
			const items = this.state.messageArr.map( ( e, i ) => {
				return <section key={ i } style={ S.item } >
					{ e.label }
					<em style={ S.em }> { e.value } </em>
				</section>
			} )
			return 	<div style={ { ...S.container, opacity: this.state.style } } >
				 	<h4 style={ S.title }> { this.props.title } </h4>
					{ items }
				</div>
}	} )
