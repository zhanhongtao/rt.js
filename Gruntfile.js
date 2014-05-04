
module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    uglify: {
      options: {
        compress: { 
          dead_code: true,
          unused: true,
          drop_debugger: true,
          warnings: true
        },
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      target: {
        options: {
          sourceMap: true,
          sourceMapName: './<%= pkg.name %>.map'
        },
        files: {
          'rTemplate.<%= pkg.version %>.min.js': ['<%= pkg.main %>']
        }
      }
    },
  });
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.registerTask( 'default', [ 'uglify' ] );
};

