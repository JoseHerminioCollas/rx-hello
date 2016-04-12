/** General purpose application logging
 * @module goatstone/log/Log
*/
'use strict'
const Log = {
  debug: ( label, message) => {
    console.log('debug', label, message )
  }
}
module.exports = Log
