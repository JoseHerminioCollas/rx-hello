/* goatstone.generator.city */

function* city( cities ){
    for(var i = 0; i < cities.length; i++){
        yield cities[i][1]
    }
}

module.exports = city
