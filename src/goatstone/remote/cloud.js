/* goatstone.cloud.cloud */
'use strict'
const Rx = require( 'rx' )
const async = require( "async" )
const tasks = require( 'goatstone/remote/task/tasks' )

function Cloud(){
    this.owKey = 'owkey'
}
Cloud.prototype.weather = function(){
    return new Promise( function (resolve, reject) {
        async.parallel( tasks.map( e => { 
            return e.task 
        } ), ( err, results ) => {
            // results are returned from the server 
            resolve( { type: 'results', data: results } )
        } )                

    } )
}
Cloud.prototype.twitter = function(){
    return new Promise( function ( resolve, reject ) {
        resolve( 100 )
    } )
}
module.exports = Cloud
