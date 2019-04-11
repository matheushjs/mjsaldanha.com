var ESL_ENV = process.env.ESL_ENV;


if(ESL_ENV === "server") {
  var env = {
    "node": true,
    "es6": true
  };

  var ecmaVersion = 2017;
  var noConsole = ["off"];
} else if(ESL_ENV === "browser") {
  var env = {
    "browser": true,
    "commonjs": true,
    "jquery": true
  };

  var ecmaVersion = 5;
  var noConsole = ["warn"];
}

module.exports = {
  "env": env,
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": ecmaVersion,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2, { "MemberExpression": 0 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": noConsole,
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};
