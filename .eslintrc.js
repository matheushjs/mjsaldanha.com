var ESL_ENV = process.env.ESL_ENV;


if(ESL_ENV === "server") {
  var env = {
    "node": true,
    "es6": true
  };

  var noConsole = ["off", { "allow": ["warn", "error"] }];
  var parserOptions = {
    "ecmaVersion": 2017,
    "sourceType": "module"
  };

} else if(ESL_ENV === "browser") {
  var env = {
    "browser": true,
    "jquery": true,
    "es6": true
  };

  var noConsole = ["warn", { "allow": ["warn", "error"] }];
  var parserOptions = {
    "ecmaVersion": 2015,
    "sourceType": "script"
  };
}

module.exports = {
  "env": env,
  "extends": "eslint:recommended",
  "parserOptions": parserOptions,
  "rules": {
    "indent": ["error", 2, { "MemberExpression": 0 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": noConsole,
    "no-unused-vars": ["error", { "args": "none" }]
  }
};
