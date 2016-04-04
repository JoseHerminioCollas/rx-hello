/* goatstone.ui.MessageDisplay */
const React = require('react')

module.exports = React.createClass ( {
    componentWillMount: function () {
        this.props.appStream
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
        const style = this.props.style
        return <div style={ { ...style.container, opacity: this.state.opacity } }>
            { this.state.message }
        </div>
    }
} )
