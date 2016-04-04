/** An object that creates events for reactive streams
 * @module goatstone/stream/event
*/
function Event() {}
Event.configure = {}
Event.configure.validEvents = [
  { type: 'command',
    names: [ 'start', 'stop', 'getData' ] },
  { type: 'stateChange',
    names: [ 'started', 'stopped', 'loaded', 'map-loaded', 'twitter-loaded', 'weather-loaded' ] },
  { type: 'message',
    names: [ 'system', 'user', 'all' ] }
]
Event.getTypes = function(){
  const types = Event.configure.validEvents.reduce( ( pre, curr, currI, arr ) => {
    return pre.concat( curr.type )
  }, [] )
  return types
}
Event.getNames = function( type ){
  const names = Event.configure.validEvents.reduce( ( pre, curr, currI, arr ) => {
    if(type === curr.type){
      return pre.concat( curr.names )
    }
    return pre
  }, [] )
  return names
}
Event.prototype.create = function( type, name, data ){

  if( !type || typeof type !== 'string' ){
    throw new Error( 'type argument of type String is required' )
  }
  if( !name || typeof name !== 'string' ){
    throw new Error( 'name argument of type String is required' )
  }
  // check for valid types
  if(Event.getTypes().indexOf(type) === -1){
    throw 'Event type provided for event is not valid'
  }
  // check for valid names
  if( Event.getNames( type ).indexOf( name ) === -1 ){
    throw new Error( 'Name provided for event is not valid.' )
  }

  const eventObj = {}
  Object.assign( eventObj, { name, type } )
  if( data ){
    Object.assign( eventObj, { data } )
  }
  return eventObj
}
module.exports = Event
