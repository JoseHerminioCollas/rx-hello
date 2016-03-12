/* ModifyVal */

function ModifyVal(){
    this.increaseVal = 500
    this.decreaseVal = 700
}
ModifyVal.prototype = {
    increase: n => n + 200,
    decrease: n => ( n > 0 )? n - 500 : 3000
}

module.exports = ModifyVal