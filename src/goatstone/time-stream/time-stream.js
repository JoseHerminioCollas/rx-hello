'strict mode'
const Rx = require( 'Rx' )
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