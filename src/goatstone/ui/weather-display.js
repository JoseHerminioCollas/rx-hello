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
		getInitialState: function() {
		    return { message: 'init message', title: 'init title', messageArr: [], opacity:0.0}
		},
	 	render:  function() {
	 		const items = this.state.messageArr.map( function( e, i ){
	 			return <div key={ i }>
	 				{ e.label }   
	 				<em> { e.value } </em> 
	 			</div>
	 		})
	 		return <div style={ { opacity: this.state.opacity, ...this.style } }> { items } </div>
	 	}
	 })  
}