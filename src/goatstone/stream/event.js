/** An object that creates events for reactive streams
 * @module goatstone/stream/event
*/
const Log = require( 'goatstone/log/log' )

/** @constructor */
function Event() {}
/** Store configuration settings
 * @static
*/
Event.configure = {}
/** Set the valid events
 * @static
*/
Event.configure.validEvents = [
  { type: 'command',
    names: [ 'start', 'stop' ] },
  { type: 'stateChange',
    names: [ 'started', 'stopped', 'loaded', 'mapLoaded', 'twitterLoaded', 'weatherLoaded' ] },
  { type: 'message',
    names: [ 'system', 'user', 'all' ] },
  { type: 'getData',
    names: [ 'twitter', 'weather' ] }
]
/** Get a list of the valid event types
 * @static
*/
Event.getTypes = function(){
  const types = Event.configure.validEvents.reduce( ( pre, curr, currI, arr ) => {
    return pre.concat( curr.type )
  }, [] )
  return types
}
/** Get a list of valid names
 * @static
 * @param { string } type Get the valid names for a particular type
*/
Event.getNames = function( type ){
  if ( !type ) throw 'A type argument is required.'
  const names = Event.configure.validEvents.reduce( ( pre, curr, currI, arr ) => {
    if(type === curr.type){
      return pre.concat( curr.names )
    }
    return pre
  }, [] )
  return names
}
/** Create a valid event base on supplied agruments
 * @param { string } type The type of event to be created
 * @param { string } name The name of the event to be created
 * @param { array } data The optional parameter to set additional parameters
 * @return { object } eventObj A valid object to be sent with a stream
*/
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
  // log the event
  Log.debug( 'event being created', eventObj )
  return eventObj
}
module.exports = Event
