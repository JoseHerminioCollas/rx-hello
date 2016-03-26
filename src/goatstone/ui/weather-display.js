/* goatstone.ui.WeatherDisplay  */
const React = require( 'react' )

module.exports = function( appStream ){
	const containerStyle = {
		backgroundColor: 'gray',
			transition: 'opacity 3s',
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'column',
			borderRadius: '13px',
			width: '100%'
	}
	const itemStyle = {
		backgroundColor: 'hsla( 200, 50%, 50%, 0.5 )',
			margin: '1px',
			borderRadius: '3px',
			flexGrow: 1,
			textAlign: 'right'
	}
	const emStyle = {
		backgroundColor: 'hsla( 200, 50%, 50%, 1.0 )',
		padding: '3px'
	}
	return React.createClass({
		componentWillMount: function(){

			appStream.filter( x => x.type === 'content' )
			.subscribe( x => {
				this.setState( { messageArr: x.data, opacity: 1.0 } )
			},err=>{throw err},()=>console.log('cmplt'))

		},
		getInitialState: function() {
		    return {
				message: 'init message',
				title: 'init title',
				messageArr: [],
				opacity: 0.0
			}
		},
	 	render:  function() {
	 		const items = this.state.messageArr.map( ( e, i ) => {
	 			return <div key={ i } style={ itemStyle } >
	 				{ e.label }   
	 				<em style={ emStyle }> { e.value } </em>
	 			</div>
	 		}   )
	 		return <div style={
	 			{ ...containerStyle, opacity: this.state.opacity }
	 		}> { items } </div>
	 	}
	 })  
}