'strict mode'
const Rx = require( 'Rx' )
const ModifyVal = require( './modify-val' )
const mv = new ModifyVal()

const disposable = Rx.Scheduler.default.schedule(
  'world',
  function (scheduler, x) { console.log('hello ' + x); }
);

var intervalTime = 300
var totalTime = 0
const source = Rx.Observable
    .range(0, 113 )
    .delay( ( x ) => { //.delayWithSelector(
        intervalTime = mv.decrease( intervalTime )
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
 