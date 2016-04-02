/** goatstone/ui/twitter-display */
'use strict'
const React = require('react')

module.exports = function ( appStream ) {

    return React.createClass({
        componentWillMount: function () {
            appStream
                .filter( x => x.type === 'onload' && x.name === 'twitter' )
                .subscribe(x => {
                    this.setState(
                        {
                            tweets: x.data.statuses,
                            opacity: 1.0
                        })
                }, err => { throw err }, () => console.log('cmplt'))
        },
        getInitialState: function () {
            return {
                message: '',
                title: 'Twitter Feed for the city name and the term "weather"',
                opacity: 0.0,
                tweets: []
            }
        },
        render: function () {
            const CSS = this.props.style
            const items = this.state.tweets.map( ( e, i ) => {
                return  <article style={ CSS.article } key={ i } >
                            { e.user.name }{ e.text }
                        </article>
            } )
            return  <div style={ { ...CSS.container, opacity: this.state.opacity } }>
                    <h4 style={ CSS.title }>{ this.state.title }</h4>
                        { items }
                    </div>
        }
    })
}
