/* ModifyVal */
function ModifyVal(){
    this.increaseVal = 200
    this.decreaseVal = 700
}
ModifyVal.prototype = {
    increase: n => n + 200,
    decrease: n => ( n > 0 )? n - 500 : 4000 
}
module.exports = ModifyVal