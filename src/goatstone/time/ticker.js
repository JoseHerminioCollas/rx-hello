/* goatstone.time.Ticker */
'use strict'
function Ticker(){
	 this.cb
	 this.isRunning = false
}
Ticker.prototype.onTick = function( cb ){
	this.cb = cb
}
Ticker.prototype._tick = function( i ){
	if ( !this.isRunning )return
	this.cb( i )
	this.isRunning = ( i > 60 )? false : this.isRunning // 10X max times
	if( this.isRunning ){
		setTimeout( x => {
			++i
			this._tick( i )
		}, 5000 )
	}
}
Ticker.prototype.stop = function(){
	this.isRunning = false
}
Ticker.prototype.start = function(){
	if ( this.isRunning ) return
	this.isRunning = true
	this._tick( 0 )
}

module.exports = Ticker
