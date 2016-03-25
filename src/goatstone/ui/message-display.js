/* goatstone.ui.MessageDisplay  */
const React = require('react')

module.exports = function ( appStream ) {

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
        style: {
            fontSize: '1.2em',
            transition: 'opacity 6s',
            borderRadius: '13px',
            width: '100%',
            backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
            padding: '12px'
        },
        getInitialState: function () {
            return {
                message: 'init message',
                title: 'Goatstone',
                opacity: 0.0
            }
        },
        render: function () {
            return <div style={ { opacity: this.state.opacity, ...this.style } }>
                <h3>{ this.state.title }</h3>
                { this.state.message }
            </div>
        }
    })
}
