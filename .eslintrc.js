module.exports = {
    "extends": "standard",
    "globals": {
        "it": false,
        "describe": false,
        "beforeEach": false,
        "afterEach": false
    },
    "plugins": [
        "standard",
        "promise"
    ],
    "settings": {
    },
     "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "newIsCap": false,
        "capIsNew": false,         
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
 		"indent": ["error", 4],
        "semi": 2,
        "new-cap": 0
    }
}