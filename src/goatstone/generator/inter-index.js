/* goatstone.generator.iterIndex */

function* iterIndex( arr, index = 0 ){
    for( let i = index; i < arr.length; i++ ){
        yield arr[i][1]
    }
}

module.exports = iterIndex
