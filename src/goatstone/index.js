/* goatstone.index   */
'strict mode'   
const Rx = require( 'rx' )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const Cloud = require( 'goatstone/remote/cloud' )
const Format = require( 'goatstone/text/format' )
require( 'babel-polyfill' ) 
//
const format = new Format()
const cloud = new Cloud( { owKey: 'abc' } )
/* appSubjectSource   
	handles application componet gererated events
*/
const appSubjectSource = FuncSubject.create()
const Message = require( 'goatstone/ui/message' )( appSubjectSource )

/* controlSubjectSource 
    handles the stream from the control panel
*/
const controlSubjectSource = FuncSubject.create()
const Control = require( 'goatstone/ui/control' )( controlSubjectSource ) 

controlSubjectSource
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'stop' ) 
} )
.subscribe( controlObserver( 'SourceAA' ) ) 
function controlObserver( tag ) {
    return Rx.Observer.create(
        ( x ) => {
            console.log( ` stop source ${x} ${tag}`, x )            	
        }, err => { console.log( 'error: ', err ) }, () => { console.log( 'complete' ) } ) 
}

controlSubjectSource
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'weather' ) 
} )
.subscribe( evnt => {

    new Rx.Observable.fromPromise( cloud.weather() )
    .subscribe(
    (x) => { 
      const formatedContent = format.JSONtoHTML( x.data )
      appSubjectSource.onNext( formatedContent )     
    },
    (e) => { console.log('cloud weather error: ' + e.message) },
    () => { console.log('cloud weather completed: ') })

}, err => { console.log( 'error: ', err ) }, () => { console.log( 'complete' ) } ) 

controlSubjectSource
.filter( evnt => { 
    return ( evnt.type === 'click' && evnt.target.name === 'start' ) 
} )
.subscribe( evnt => {
    console.log( 'start', evnt )
}, err => { console.log( 'error: ', err ) }, () => { console.log( 'complete' ) } ) 


window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 
}
console.log( 44 )
