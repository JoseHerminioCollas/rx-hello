/** Select a city from a pop up select menu
 * @module goatstone/ui/city-select
 */
'use strict'
const React = require( 'react' )
const FuncSubject = require('rx-react').FuncSubject

const CitySelect = React.createClass({
  getInitialState: function(){
    return {
      city: 'london'
    }
  },
  componentWillMount: function(){
    this.props.appStream
      .filter( x => x.type === 'stateChange' && x.name === 'weatherLoaded' )
      .subscribe( x => {
          this.setState( { 'city': x.data.cityKey, opacity: 1.0  } )
      }, err=>{throw err}, ()=>{console.log('cmplt')})

    this.changeHandler = FuncSubject.create( x => {
      const cityValue = x.target.value
      this.setState( {city: cityValue } )
      this.props.controlStream.onNext(
        this.props.streamEvent.create( 'command', 'stop' )
      )
      return this.props.streamEvent.create( 'getData', 'weather',
        { city: cityValue } )
    })
    this.changeHandler.subscribe( x =>{
      this.props.controlStream.onNext(
        this.props.streamEvent.create( 'getData', 'twitter',
          { city: x.data.city } )
      )
        this.props.controlStream.onNext( x )
    }, err => {throw err}, () => { return 'complete' } )
  },
  render: function(){
    const els = this.props.cityData.map( ( e, i ) => {
      return React.createElement( "option", { value: e[1], key: i }, e[0] )
    } )
    return	<select value={ this.state.city } onChange={ this.changeHandler }  style={ this.props.style }>
              { els }
            </select>
  }
})

module.exports = CitySelect
