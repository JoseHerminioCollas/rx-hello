'strict mode'
const Rx = require( 'rx' )
const ModifyVal = require( 'goatstone/util/modify-val' )
const numberYield = require( 'goatstone/func-stream/number-yield' )

const modifyVal = new ModifyVal()
var intervalTime = 300
var totalTime = 0

const source = Rx.Observable
    .from( numberYield() )
    .take( 10 )
    .delay( ( x ) => { //.delayWithSelector(
        intervalTime = modifyVal.decrease( intervalTime )
        totalTime = totalTime + intervalTime
        return Rx.Observable.timer( totalTime ) 
    } )
    .timeInterval()
    .map( ( x ) => { 
        return x.value + ':' + x.interval 
    });

 module.exports = source

 // const source = require( 'goatstone/time-stream/time-stream' )

// const subscription = source.subscribe(
//     function (x) { 
//         console.log( 'Next: ' + x ) 
//     },
//     function (err) { 
//         console.log( 'Error: ' + err ) 
//     },
//     function () { 
//         console.log( 'Completed' )  
//     }) 

/**     
TimeStream represents an API over an Obervable
@param  {function} funcStream Function to use as an event stream
@returns Observable
*/
/**
start start the stream 
*/
/**
stop stop the stream
*/
