/** Test the stream event creator stream.event.Event
*/
const expect = require( 'chai' ).expect
const StreamEvent = require( 'goatstone/stream/event' )
const streamEvent = new StreamEvent()
const event = streamEvent.create('stateChange', 'stopped')

describe('Stream Event Generator', () => {

  describe('Create a Stream Event', () => {

    it('should create a proper event object', function(){
      expect( event ).to.be.an.instanceof( Object )
    })
    it('should have property "name"', () => {
      expect( event ).to.have.property( 'name' )
    })
    it('should have propery "type" ', () => {
      expect( event ).to.have.property( 'type' )
    })
    it('should throw an error if incorrect agruments are supplied', () => {
      expect( function(){ streamEvent.create() } ).to.throw( Error )
      expect( function(){ streamEvent.create('a') } ).to.throw( Error )
    })
    it('should not throw and error if two string agruments are supplied', () => {
      expect( function(){ streamEvent.create( 'a', 'b' ) } ).to.not.throw( Error )
    })
    it('should throw an error if the arguments supplied are not of type String', () => {
      expect( function(){ streamEvent.create('x', 1) } ).to.throw( Error )
    })
    it('should return the correct data if a data argument is supplied', () => {
      expect(  streamEvent.create( 'command', 'start', [ { a:'test' } ] ) ).to.have.property( 'data' )
    })

  })

} )
