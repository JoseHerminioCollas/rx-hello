/* goatstone.index   */
'strict mode'   
const Rx = require( 'rx' )
const async = require( "async" )
const React = require( 'react' )
const ReactDOM = require( 'react-dom' )  
const tasks = require( 'goatstone/remote/task/tasks' )
const FuncSubject = require('rx-react').FuncSubject;
require( 'babel-polyfill' ) 

/* appSubjectSource   
	handles application componet gererated events
*/
const appSubjectSource = FuncSubject.create()
appSubjectSource.subscribe( createObserver( 'SourceA' ) ) 
//appSubjectSource.subscribe( createObserver( 'SourceB' ) ) 
function createObserver( tag ) {
    return Rx.Observer.create(
        function ( x ) {
            /* call only if the  weather button is pushed */
            if( x.type === 'click' ){
                async.parallel( tasks.map( e => { 
                    return e.task 
                } ), ( err, results ) => {
                    // results are returned from the server
                    appSubjectSource.onNext( { type: 'results', data: results } )
                } )                
            }
        },
        function ( err ) {
            console.log('Error: ' + err)    
        },
        function () {
            console.log('Completed')    
        }) 
}
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
        function ( x ) {
            console.log('TTTT 5: ' + tag )    
            // console.log( x )            	
        },
        function ( err ) {
            console.log('Error: ' + err)    
        },
        function () {
            console.log('Completed')    
        }) 
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
