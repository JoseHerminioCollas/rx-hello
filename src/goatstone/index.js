'strict mode'

const source = require( './time-stream/time-stream' )

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