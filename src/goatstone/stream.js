'use strict'
var Rx = require('rxjs/Rx');

let isReadyG = new Rx.Subject()
let data = new Rx.Subject()
let isReady = new Rx.Subject()
let drawData = isReady
.combineLatest(data, isReadyG, (x, x1) => x1)

drawData.subscribe((x)=>{
    console.log('k ', x)
})

isReady.next() // Need to call this to get it started

data.next({a: 2})
data.next({a: 3})

isReadyG.next(true)

data.next({a: 4})

var source = Rx.Observable
    .interval(1500)
    .timeInterval()
    .take(5);

var subscription = source.subscribe(
    (x) => {
        let n = Math.random()
        data.next({a: n})
    },
    (err) => { console.log('Error: ' + err) },
    () => { console.log('Completed') }
)