/* numberYield */

function* numberYield(){
    var a = 100
    while(a){
        yield a--
    }
}

module.exports = numberYield