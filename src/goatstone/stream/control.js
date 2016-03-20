/* goatstone.stream.control */
'strict mode'

const Rx = require('rx')
const FuncSubject = require('rx-react').FuncSubject
const Cloud = require('goatstone/remote/cloud')
const Format = require('goatstone/text/format')
const oCBacks = require('goatstone/util/o-call-backs')

const format = new Format()
const cloud = new Cloud({owKey: 'abc'})
const controlStream = FuncSubject.create()

module.exports = function (appStream) {

    controlStream
        .filter(x => x.type === 'click' && x.target.name === 'weather')
        .flatMap( x => Rx.Observable.fromPromise( cloud.weather() ) )
        .subscribe( x => {
            cloud.map()
            appStream.onNext({
                type: 'content',
                data: format.JSONtoContentList( x.data )
            })
        }, oCBacks.error, oCBacks.complete )

    controlStream
        .filter( x => x.type === 'click' && x.target.name === 'stop' )
        .subscribe( x => {
            console.log( ` stop source ${x}`, x )
        }, oCBacks.err, oCBacks.complete )

    controlStream
        .filter( x => x.type === 'click' && x.target.name === 'start')
        .subscribe( x => {
            console.log( `start ${x}` )
        }, oCBacks.err, oCBacks.complete )

    return controlStream
}
