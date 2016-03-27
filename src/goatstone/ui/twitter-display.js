/** goatstone/ui/twitter-display */

/* goatstone.ui.MessageDisplay  */
const React = require('react')

module.exports = function ( appStream ) {
    const containerStyle = {
        color: 'hsla( 200, 10%, 20%, 1.0 )',
        transition: 'opacity 2s',
        borderRadius: '13px',
        backgroundColor: 'hsla( 200, 20%, 50%, 0.5 )',
        padding: '6px'
    }
    const articleStyle = {
        fontSize: '0.9em',
        padding: '7px',
        margin: '7px',
        borderRadius: '7px',
        color: 'hsla( 100, 50%, 10%, 1.0 )',
        background: 'hsla( 200, 90%, 90%, 1.0 )'
    }
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
                title: 'Twitter Feed',
                opacity: 0.0,
                tweets: []
            }
        },
        render: function () {
            const items = this.state.tweets.map( ( e, i ) => {
                return  <article style={ articleStyle } key={ i } >
                            { e.user.name }{ e.text }
                        </article>
            } )
            return  <div style={ { ...containerStyle, opacity: this.state.opacity } }>
                    <h4>{ this.state.title }</h4>
                        { items }
                    </div>
        }
    })
}
