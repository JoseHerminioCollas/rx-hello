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
      .filter( x => x.type === 'onLoad' && x.name === 'weather' )
      .subscribe( x => {
          this.setState( { 'city': x.data, opacity: 1.0  } )
      }, err=>{throw err}, ()=>{console.log('cmplt')})

    this.changeHandler = FuncSubject.create( x => {
      console.log('change')
      const cityValue = x.target.value
      this.setState( {city: cityValue } )
      this.props.controlStream.onNext( { type:'control', name: 'stop' } )
      return {
        type: 'getData',
        name: 'weather',
        data: { city: cityValue }
      }
    })
    this.changeHandler.subscribe( x =>{
      this.props.controlStream.onNext( {
          type:'getData',
          name:'twitter',
          data: { city: x.data.city }
        } )
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
