/* goatstone.ui.TitleHeader  */
'use strict'
const React = require('react')

module.exports = function ( appStream ) {
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
            const style = this.props.style
            return <div style={ { ...style.container, opacity: this.state.opacity } }>
                <a style={ style.link } href="//goatstone.com" target="new1">
                  Goatstone
                </a> :
                <a style={ style.link } href="https://github.com/JoseHerminioCollas/rx-hello" target="new2">
                  &nbsp;Weather
                </a>
            </div>
        }
    } )
}
