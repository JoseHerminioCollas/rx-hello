/* goatstone.index   */
'strict mode'   
const Rx = require( 'rx' )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const Cloud = require( 'goatstone/remote/cloud' )
const Format = require( 'goatstone/text/format' )
const oCBacks = require( 'goatstone/util/o-call-backs' ) 
require( 'babel-polyfill' ) 

const format = new Format()
const cloud = new Cloud( { owKey: 'abc' } )
const appStream = FuncSubject.create()
const controlStream = FuncSubject.create()
const Control = require( 'goatstone/ui/control' )( controlStream ) 
const Message = require( 'goatstone/ui/message' )( appStream )

// weather 
controlStream
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'weather' ) 
} )
.map( evnt => {
    return Rx.Observable.fromPromise( cloud.weather() )
})
.flatMap( x => { 
    return x 
} )
.subscribe( x => {
    appStream.onNext( { type:'content', data: format.JSONtoHTML( x.data ) } )     
}, oCBacks.error, oCBacks.complete )

// stop
controlStream
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'stop' ) 
} )
.subscribe( x => {
            console.log( ` stop source ${x} ${tag}`, x )                
        }, oCBacks.err, oCBacks.complete 
 ) 
// start
controlStream
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'start' ) 
} )
.subscribe( evnt => {
    console.log( 'start', evnt )
}, oCBacks.err, oCBacks.complete )


window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 

    appStream.onNext( { type:'error', data: [ { label:'hello', value: 'warn' } ] } )     
    appStream.onNext( { type:'content', data: [ { label:'hello', value: 'content' } ] } )     
    appStream.onNext( { type:'warn', data: [ { label:'hello', value: 'warn' } ] } )     

}
