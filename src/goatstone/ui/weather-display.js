/* goatstone.ui.WeatherDisplay  */
const React = require( 'react' )

module.exports = function( appStream ){
	const containerStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		padding: '6px',
		transition: 'opacity 1s'
	}
	const itemStyle = {
		fontSize: '0.9em',
		padding: '3px',
		margin: '1px 0px',
		borderRadius: '3px',
		color: 'hsla( 100, 50%, 10%, 1.0 )',
		backgroundColor: 'hsla( 200, 50%, 50%, 1.0 )',
		flexGrow: 1,
		textAlign: 'right'
	}
	const emStyle = {
		fontSize: '1.2em',
		fontWeight: 900,
		display: 'inline-block',
		background: 'hsla( 200, 90%, 90%, 1.0 )',
		padding: '3px',
		margin: '0 6px',
		borderRadius: '3px'
	}
	const titleStyle = {
		fontSize: '1.0em',
		color: 'hsla( 200, 40%, 90%, 1.0 )',
		backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
		borderRadius: '3px',
		padding: '12px',
		margin: 0
	}
	return React.createClass({
		componentWillMount: function(){
			appStream.filter( x => x.type === 'content' )
			.subscribe( x => {
				this.setState( { messageArr: x.data, opacity: 1.0 } )
			},err => { throw err }, () => console.log('cmplt') )

		},
		getInitialState: function() {
		    return {
				title: 'OpenWeatherMap.org Feed',
				messageArr: [],
				opacity: 0.0
			}
		},
	 	render: function() {
	 		const items = this.state.messageArr.map( ( e, i ) => {
	 			return <section key={ i } style={ itemStyle } >
	 				{ e.label }
	 				<em style={ emStyle }> { e.value } </em>
	 			</section>
	 		} )
	 		return 	<div style={
	 							{ ...containerStyle, opacity: this.state.opacity }
							}>
							 	<h4 style={ titleStyle }> { this.state.title } </h4>
								{ items }
							</div>
	 	}	} )
}
