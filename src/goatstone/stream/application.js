/* goatstone.stream.application */
"use strict"

const FuncSubject = require('rx-react').FuncSubject
const appStream = FuncSubject.create()
const devMode = false;

appStream.subscribe( x => {

    if(devMode){
        console.log( `${x.name} : ${x.type} -  ` , x.data )
    }

})

module.exports = appStream
