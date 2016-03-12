# hellorx

hellorx ( Hello Rx ),  A place to work out Rx and async issues.

## Methodologies to Establish

* User action streams
* Retrieve remote data as streams
* Create non-linear timing for streams
* Use ES6 generator functions for streams
* Utilize and incorporate the `async` library with Rx as needed

### Install

* Clone the repo: git clone `git clone https://github.com/JoseHerminioCollas/rx-hello.git`

* cd `rx-hello`

* `npm install`

* Create a sym link to used to in order to enable absolute paths in `require()` expressions.

	For example, I want to write this:

	`goatstone/func-stream/number-yield`  

	On my Mac I can use this line

	`ln -s /Users/goat/projects/hellorx/src/goatstone /Users/goat/projects/hellorx/node_modules/goatstone`

* Run some code with

	`node src/goatstone/index.js`
