/* goatstone.ui.MessageDisplay  */
const React = require('react')

module.exports = function ( appStream ) {
    const containerStyle = {
        fontSize: '2.0em',
        color: 'hsla( 200, 10%, 10%, 1.0 )',
        transition: 'opacity 6s',
        borderRadius: '7px',
        minWidth: '6em',
        width: '100%',
        backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
        padding: '10px'
    }
    return React.createClass ( {
        componentWillMount: function () {
            appStream
                .filter( x => x.type === 'message' )
                .subscribe( x => {
                    this.setState(
                        {
                            message: x.data.message,
                            opacity: 1.0
                        })
                }, err => {
                    throw err
                }, () => console.log('cmplt') )
        },
        getInitialState: function () {
            return {
                message: '',
                opacity: 0.0
            }
        },
        render: function () {
            return <div style={ { ...containerStyle, opacity: this.state.opacity } }>
                { this.state.message }
            </div>
        }
    } )
}
