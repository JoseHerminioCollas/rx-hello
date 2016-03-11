
const Rx = require('Rx')

const source = Rx.Observable
    .range(0, 13 )
    .delay( ( x ) => { //.delayWithSelector(
        return Rx.Observable.timer( 2000 * x ) 
    } )
    .timeInterval()
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
 