/* async-tasks */
'use strict'
const async = require("async")
const asyncTasks = []
const tasks = [ 
	{ task: cb => { 
		console.log('a')  
		cb() 
	} }, 
	{ task: cb => { 
		setTimeout( () =>{ 
			console.log('b')  
			cb() 
		}, 1000 ) 
	} }, 
	{ task: cb => { 
		setTimeout( () => {
			console.log('c')  
			cb()
		}, 3000 ) 
	} } 
]
tasks.forEach( ( e, i ) => {
  asyncTasks.push( e.task )
})
 
async.parallel( asyncTasks, onComplete )

function onComplete(){
	console.log("complete")
}