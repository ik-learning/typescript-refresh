// https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#grunt
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-ts');
  grunt.initConfig({
    ts: {
      main: {
        src: ["typescript/*.ts", "!node_modules/**/*.ts"],
        dest:'out/main.js'
      }
    }
  });
  grunt.registerTask("default", ["ts"]);
}
