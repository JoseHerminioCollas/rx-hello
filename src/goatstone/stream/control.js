/* goatstone.stream.control */
'use strict'
const Rx = require('rx')
const FuncSubject = require('rx-react').FuncSubject
const Format = require('goatstone/text/format')

const oCBacks = require('goatstone/util/o-call-backs')
const format = new Format()
const controlStream = FuncSubject.create()
require( 'babel-polyfill' )

module.exports = function ( appStream, cloud, ticker ) {
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
            appStream.onNext( {
                type: 'onload',
                name: 'twitter',
                data: x.data
            } )
        }, oCBacks.error, oCBacks.complete )
    // get weather data
    controlStream
        .filter(x => x.type === 'getData' && x.name === 'weather')
        .flatMap( x => { 
            return Rx.Observable.fromPromise( cloud.weatherMap( x.data ) )
        } )
        .subscribe( x => {
            appStream.onNext({
                type: 'onLoad',
                name: 'weather',
                data: x.req.city
            })
            appStream.onNext({
                type: 'message',
                data: {message: x.res.data.name }
            })
            appStream.onNext({
                type: 'content',
                data: format.JSONtoContentList( x.res.data )
            })
        }, oCBacks.error, oCBacks.complete )
    // control the state, start     
    controlStream
       .filter( x => x.type === 'control' && x.name === 'start' )
        .subscribe( x => {
            ticker.start()
        }, oCBacks.error, oCBacks.complete )
    // control the state, stop it
    controlStream
       .filter( x => x.type === 'control' && x.name === 'stop' )
        .subscribe( x => {
            ticker.stop()
            appStream.onNext( { type: 'stateChange', name: 'stopped' } )
        }, oCBacks.error, oCBacks.complete )
    // display al events for debug TODO  remove this debug code
    controlStream.subscribe( x =>{
    }, oCBacks.error, oCBacks.complete )

    return controlStream
}
