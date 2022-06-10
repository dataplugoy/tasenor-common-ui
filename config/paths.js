const path = require("path");

module.exports = {
  // Source files
  src: path.resolve(__dirname, "../example"),

  // Production build files
  build: path.resolve(__dirname, "../example/public"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, "../example/public"),

  // Source files
  lib: path.resolve(__dirname, "../src"),
};
