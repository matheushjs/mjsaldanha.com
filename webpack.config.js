var path = require("path");

module.exports = {
  mode: "production",
  entry: {
    custom: "./client/custom.js",
    loginForms: "./client/loginForms.js"
  },
  output: {
    path: path.resolve(__dirname, "public/scripts")
  },
  target: "web",
  parallelism: 8
};
