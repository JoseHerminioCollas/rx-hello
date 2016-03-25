/* goatstone.stream.application */
"use strict"

const FuncSubject = require('rx-react').FuncSubject
const appStream = FuncSubject.create()
appStream.subscribe( x => {

    console.log( `${x.name} : ${x.type} -  ` , x.data )
    console.log( x.data )
})

module.exports = appStream