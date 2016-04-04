/** Toggle an off/on state with a single button
 * @module goatstone/ui/start-stop
 */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject

const StartStop = React.createClass(
{
  componentWillMount: function(){

    this.props.appStream
      .filter( x =>  x.type === 'stateChange' && x.name === 'stopped' )
      .subscribe( () => {
          this.setState(
            { isPlaying: false }
          )
          this.setState( { stop : { isDisabled: true } } )
      }, err=>{throw err}, ()=>{console.log('cmplt')})

    this.clickHandler = FuncSubject.create( () => {
      this.setState( { isPlaying: !this.state.isPlaying } )
      const eventName = this.state.isPlaying ? 'stop' : 'start'
      return {
        name: eventName,
        type: 'control'
      }
    } )
    this.clickHandler.subscribe( x => {
      this.props.controlStream.onNext( x )
    }, err=>{throw err}, ()=>console.log('complete') )

  },
  getDefaultProps: function(){
    return { buttonLabel: 'Start'}
  },
  getInitialState: function(){
    return { isPlaying: false }
  },
  render: function(){
    const CSS = this.props.style
    const label = this.state.isPlaying ? 'stop' : 'start'
    return	<button style={ CSS } onClick={ this.clickHandler }>
              { label }
            </button>
  }
})

module.exports =  StartStop
