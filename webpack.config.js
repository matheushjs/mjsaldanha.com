var path = require("path");

module.exports = {
  mode: "production",
  entry: {
    custom: "./client/custom.js",
    loginForms: "./client/loginForms.js"
  },
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    library: "Elf", 
    libraryTarget: "var", /* export default is assigned to `var Elf` */
    libraryExport: "default" /* export default */
  },
  target: "web",
  parallelism: 8
};
