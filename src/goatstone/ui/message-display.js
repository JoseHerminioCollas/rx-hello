/* goatstone.ui.MessageDisplay  */
const React = require('react')

module.exports = function ( appStream ) {
    const containerStyle = {
        fontSize: '2.2em',
        color: 'hsla( 200, 10%, 20%, 1.0 )',
        transition: 'opacity 6s',
        borderRadius: '13px',
        minWidth: '6em',
        width: '100%',
        backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
        padding: '12px'
    }
    return React.createClass({

        componentWillMount: function () {

            appStream
                .filter( x => x.type === 'message')
                .subscribe(x => {
                    this.setState(
                        {
                            message: x.data.message,
                            title: x.data.title,
                            opacity: 1.0
                        })
                }, err => {
                    throw err
                }, () => console.log('cmplt'))

        },
        getInitialState: function () {
            return {
                message: 'init message',
                title: 'Goatstone',
                opacity: 0.0
            }
        },
        render: function () {
            return <div style={ { ...containerStyle, opacity: this.state.opacity } }>
                <h3>{ this.state.title }</h3>
                { this.state.message }
            </div>
        }
    })
}
