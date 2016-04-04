/** goatstone/ui/twitter-display */
'use strict'
const React = require('react')

module.exports = React.createClass({
    componentWillMount: function () {
        this.props.appStream
            .filter( x => x.type === 'stateChange' && x.name === 'twitterLoaded' )
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
