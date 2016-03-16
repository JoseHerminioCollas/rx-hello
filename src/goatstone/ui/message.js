/* goatstone.ui.message  */
const React = require( 'react' )

module.exports = function( appSubject ){

	var Message = React.createClass({
		componentWillMount: function( x ){
			
			appSubject.subscribe( e => {
				const d = ( e.data && e.data[0]  )? JSON.stringify( e.data[0] ) : 'Default Name' 
				this.setState( { message: ` [ ${ d } ] `  } )
			} )  
		},
		getInitialState: function() {
		    return { message: 'init message', title: 'init title'} 
			},
	 	render:  function() {
	 		const msg = (this.state.message)? this.state.message : ' - - - ' 
	 		return <div>  { msg }  </div>
	 	}
	 })  

	return Message
}