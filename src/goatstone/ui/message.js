/* goatstone.ui.Message  */
const React = require( 'react' )

module.exports = function( appSubject ){

	var Message = React.createClass({
		componentWillMount: function( x ){			
			appSubject.subscribe( e => {
				this.setState( { messageArr: e } )
			} )  
		},
		getInitialState: function() {
		    return { message: 'init message', title: 'init title', messageArr: []} 
			},
	 	render:  function() {
	 		const items = this.state.messageArr.map( function( e, i ){
	 			return <div key={ i }>
	 				{ e.label }   
	 				<em> { e.value } </em> 
	 			</div>
	 		})
	 		return <div> { items } </div>
	 	}
	 })  
	return Message
}