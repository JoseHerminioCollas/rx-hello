/* goatstone.stream.control */
'use strict'
const Rx = require('rx')
const FuncSubject = require('rx-react').FuncSubject
const Format = require('goatstone/data/convert')

const oCBacks = require('goatstone/stream/o-call-backs')
const format = new Format()
const controlStream = FuncSubject.create()
require( 'babel-polyfill' )

module.exports = function ( appStream, cloud, ticker, streamEvent ) {
    // get twitter data
    controlStream
        .filter(x => x.type === 'getData' && x.name === 'twitter')
        .flatMap( x => {
            if( !x || !x.data || !x.data.city ){ throw 'city data must be passed' }
            const city = x.data.city
            return Rx.Observable.fromPromise(
                cloud.twitter( { q: city } )
            )
        } )
        .subscribe( x => {
            appStream.onNext( streamEvent.create( 'stateChange', 'twitterLoaded', x.data )
          )
        }, oCBacks.error, oCBacks.complete )
    // get weather data
    controlStream
        .filter(x => x.type === 'getData' && x.name === 'weather')
        .flatMap( x => {
            return Rx.Observable.fromPromise( cloud.weatherMap( x.data ) )
        } )
        .subscribe( x => {
            appStream.onNext(
              streamEvent.create( 'stateChange', 'weatherLoaded',
              {
                cityKey: x.req.city,
                contentList: format.JSONtoContentList( x.res.data ) } )
            )
            appStream.onNext(
              streamEvent.create( 'message', 'user',
              {
                message: x.res.data.name } )
            )
        }, oCBacks.error, oCBacks.complete )
    // control the state, start
    controlStream
       .filter( x => x.type === 'command' && x.name === 'start' )
        .subscribe( x => {
            ticker.start()
        }, oCBacks.error, oCBacks.complete )
    // control the state, stop it
    controlStream
       .filter( x => x.type === 'command' && x.name === 'stop' )
        .subscribe( x => {
            ticker.stop()
            appStream.onNext(
              streamEvent.create( 'stateChange', 'stopped' )
            )
        }, oCBacks.error, oCBacks.complete )
    // display al events for debug TODO  remove this debug code
    controlStream.subscribe( x =>{
    }, oCBacks.error, oCBacks.complete )

    return controlStream
}
