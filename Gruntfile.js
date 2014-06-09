
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
        banner: '/*!\n  <%= pkg.name %>\n  @homepage:<%= pkg.homepage %>\n  @update: <%= grunt.template.today("yyyy-mm-dd")%>\n*/\n'
      },
      target: {
        options: {
          sourceMap: false,
          sourceMapName: './<%= pkg.name %>.map'
        },
        files: {
          'rt.<%= pkg.version %>.min.js': ['<%= pkg.main %>']
        }
      }
    },
  });
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.registerTask( 'default', [ 'uglify' ] );
};

