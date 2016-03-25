/* goatstone.stream.control */
'use strict'
const Rx = require('rx')
const FuncSubject = require('rx-react').FuncSubject
const Format = require('goatstone/text/format')
const Ticker = require( 'goatstone/time/ticker' )

const oCBacks = require('goatstone/util/o-call-backs')
const format = new Format()
const controlStream = FuncSubject.create()
const ticker = new Ticker( )
require( 'babel-polyfill' )
const cityGen = require( 'goatstone/generator/city' )

module.exports = function ( appStream, cloud ) {

    var cityI = cityGen( cloud.city() )
    ticker.onTick( x => {
            const genV = cityI.next()
            if( genV.done ){ //stop ticker
                ticker.stop()
                cityI = cityGen( cloud.city() ) // reset the generator
                appStream.onNext( { type: 'stateChange', name: 'stopped' } )
                return
            }
            const dataP = {
                type: 'getData',
                name: 'weather',
                data: { city: genV.value }
            }
            controlStream.onNext( dataP )
        }
    )

    // get weather data
    controlStream
        .filter(x => x.type === 'getData' && x.name === 'weather')
        .flatMap( x => { 
            /*
            x.data {object} { city: {string} }
            cloud.weatherMap()
            returns { request:{}, returnJSON:{} }
            */
            return Rx.Observable.fromPromise( cloud.weatherR( x.data ) )
        } )
        .subscribe( x => {
            cloud.map({
                center:
                { 
                    lat:x.res.data.coord.lat, lng: x.res.data.coord.lon
                }})
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
        }, oCBacks.error, oCBacks.complete )

    // display al events for debug TODO  remove this debug code
    controlStream.subscribe( x =>{
    }, oCBacks.error, oCBacks.complete )

    return controlStream
}
