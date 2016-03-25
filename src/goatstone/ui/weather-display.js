/* goatstone.ui.WeatherDisplay  */
const React = require( 'react' )

module.exports = function( appStream ){

	return React.createClass({
		componentWillMount: function(){

			appStream.filter( x => x.type === 'content' )
			.subscribe( x => {
				this.setState( { messageArr: x.data, opacity: 1.0 } )
			},err=>{throw err},()=>console.log('cmplt'))

		},
		style:{
			backgroundColor: 'gray',
			transition: 'opacity 3s',
			display: 'flex',
			flexWrap: 'wrap',
			borderRadius: '13px',
			width: '100%'
		},
		itemStyle: {
			backgroundColor: 'hsla( 200, 50%, 50%, 0.5 )',
			margin: '1px',
			padding: '7px',
			borderRadius: '3px',
			flexGrow: 1,
			textAlign: 'right'
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
	 			return <div key={ i } style={ this.itemStyle } >
	 				{ e.label }   
	 				<em> { e.value } </em> 
	 			</div>
	 		}   )
	 		return <div style={
	 			{ opacity: this.state.opacity, ...this.style }
	 		}> { items } </div>
	 	}
	 })  
}