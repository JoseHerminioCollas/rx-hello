/* goatstone.index   */
'strict mode'   
const Rx = require( 'rx' )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const FuncSubject = require('rx-react').FuncSubject 
const Cloud = require( 'goatstone/remote/cloud' )
require( 'babel-polyfill' ) 
console.log( 99 )       
/* appSubjectSource   
	handles application componet gererated events
*/
const appSubjectSource = FuncSubject.create()
const cloud = new Cloud( { owKey: 'abc' } )
appSubjectSource.subscribe( 
    ( x ) => {
        /* call only if  the  weather button is pushed */ 
        if( x.type === 'click' ){
            new Rx.Observable.fromPromise( cloud.weather() )
            .subscribe(
                (x) => {
                  console.log('cloud.weather: ' + x)
                  appSubjectSource.onNext( x )     
                },
                (e) => { console.log('cloud weather error: ' + e.message) },
                () => { console.log('cloud weather completed: ') })
        }
    },
    ( err ) => { console.log('Error: ' + err) },
    () => { console.log('Completed') }  
 ) 
const Weather = require( 'goatstone/ui/weather' )( appSubjectSource ) 
const Message = require( 'goatstone/ui/message' )( appSubjectSource )

/* controlSubjectSource 
    handles the stream from the control panel
*/
const controlSubjectSource = FuncSubject.create()
controlSubjectSource.subscribe( controlObserver( 'SourceAA' ) ) 
controlSubjectSource.subscribe( controlObserver( 'SourceBB' ) ) 
function controlObserver( tag ) {
    return Rx.Observer.create(
        ( x ) => {
            console.log('TTTT 5: ' + tag )    
            // console.log( x )            	
        },
        ( err ) => { console.log('Error: ' + err) },
        () => { console.log('Completed') } ) 
}
// call the ui compoent modules
const Control = require( 'goatstone/ui/control' )( controlSubjectSource ) 

window.onload = function() {
	ReactDOM.render( <Control />, 
		document.getElementById( 'control' ) ) 
	ReactDOM.render( <Message />, 
		document.getElementById( 'message' ) ) 
	ReactDOM.render( <Weather />, 
		document.getElementById( 'weather' ) ) 
}
