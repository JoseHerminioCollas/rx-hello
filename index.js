'strict mode'
const Rx = require( 'Rx' )
const ModifyVal = require( './modify-val' )
const numberYield = require( './number-yield' )

const modifyVal = new ModifyVal()
var intervalTime = 300
var totalTime = 0
const disposable = Rx.Scheduler.default.schedule(
  'world',
  function (scheduler, x) { console.log('hello ' + x)  }
)
const source = Rx.Observable
    .from( numberYield() )
    .take( 10 )
    .delay( ( x ) => { //.delayWithSelector(
        intervalTime = modifyVal.decrease( intervalTime )
        totalTime = totalTime + intervalTime
        return Rx.Observable.timer( totalTime ) 
    } )
    .timeInterval(  disposable )
    .map( ( x ) => { 
        return x.value + ':' + x.interval 
    });
const subscription = source.subscribe(
    function (x) { 
        console.log( 'Next: ' + x ) 
    },
    function (err) { 
        console.log( 'Error: ' + err ) 
    },
    function () { 
        console.log( 'Completed' )  
    }) 
 