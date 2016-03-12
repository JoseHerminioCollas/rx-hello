/* rx-dom-sample */

const axios = require( 'axios' )

axios.get('http://www.goatstone.com')
  .then(function (response) {
  	const br = response.data.substr(0, 200)
    console.log( br );
  })
  .catch(function (response) {
    console.log(response);
  });
 