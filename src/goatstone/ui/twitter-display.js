/** goatstone/ui/twitter-display */
const React = require('react')

module.exports = function ( appStream ) {
    const containerStyle = {
      color: 'hsla( 200, 10%, 20%, 1.0 )',
      transition: 'opacity 2s',
      padding: '6px'
    }
    const articleStyle = {
        fontSize: '0.9em',
        padding: '6px',
        margin: '1px 0px',
        borderRadius: '3px',
        color: 'hsla( 100, 50%, 10%, 1.0 )',
        background: 'hsla( 200, 90%, 90%, 1.0 )'
    }
    const titleStyle = {
      fontSize: '1.0em',
      color: 'hsla( 200, 40%, 90%, 1.0 )',
      borderRadius: '3px',
      backgroundColor: 'hsla( 200, 20%, 50%, 0.9 )',
      padding: '12px',
      margin: 0
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
                title: 'Twitter Feed for the city name and the term "weather"',
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
                    <h4 style={ titleStyle }>{ this.state.title }</h4>
                        { items }
                    </div>
        }
    })
}
