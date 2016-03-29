/* goatstone.ui.TitleHeader  */
const React = require('react')

module.exports = function ( appStream ) {
    const containerStyle = {
        fontSize: '1.2em',
        color: 'hsla( 200, 10%, 10%, 1.0 )',
        transition: 'opacity 1s',
        borderRadius: '7px',
        minWidth: '6em',
        width: '100%',
        backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
        padding: '10px'
    }
    const linkStyle = {
      color: 'hsla( 200 , 50%, 5%, 1.0 )',
      textDecoration: 'none'
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
                }, () => console.log( 'cmplt' ) )
        },
        getInitialState: function () {
            return {
                message: '',
                opacity: 0.0
            }
        },
        render: function () {
            return <div style={ { ...containerStyle, opacity: this.state.opacity } }>
                <a style={ linkStyle } href="//goatstone.com" target="new1">
                  Goatstone
                </a> :
                <a style={ linkStyle } href="https://github.com/JoseHerminioCollas/rx-hello" target="new2">
                  &nbsp;Weather
                </a>
            </div>
        }
    } )
}
